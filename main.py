
import os
from fastapi import FastAPI, HTTPException, Body, status, Request, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Annotated
from pydantic import BaseModel
from datetime import datetime, timedelta, timezone
import hashlib
import jwt
from jwt.exceptions import InvalidTokenError
from mongoengine import connect
from models import Organization, User, Usecase, ValueScores, ImplementationScores
from utils import  calculate_value_score, calculate_implementation_score, calculate_scores
from typing import List, Dict, Any
import uuid
import logging
from passlib.context import CryptContext
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from mongoengine.queryset.visitor import Q
load_dotenv(override=True)

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")

db_username = os.getenv("db_username")
db_password_hash = os.getenv("db_password_hash")



fake_users_db = {
    "mdz": {
        "username": db_username,
        "hashed_password": db_password_hash,
        "disabled": False,
    }
}
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Connect to MongoDB
connect(db="MDZ",host=os.getenv("MONGO_URI"))

#models for security
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class UserAuth(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = None


class UserInDB(UserAuth):
    hashed_password: str


#actual models used by the backend db
class OrganizationPydantic(BaseModel):
    name: str
    org_id: str

class UserPydantic(BaseModel):
    full_name: str
    org_id: str
    user_id: str

class UsecasePydantic(BaseModel):
    usecase_id: str
    org_id: str
    title: str
    description: str
    value_score: float = None
    implementation_score: float = None

class ValueScoresPydantic(BaseModel):
    usecase_id: str
    user_id: str


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):

    return pwd_context.hash(password)
def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)


def authenticate_user(fake_db, username: str, password: str):
    user = get_user(fake_db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    user = get_user(fake_users_db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user
async def get_current_active_user(
    current_user: Annotated[UserAuth, Depends(get_current_user)],
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

@app.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    user = authenticate_user(fake_users_db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")

@app.get("/api/get_organizations", tags=["Organization","User"])
async def get_organizations(user_id: str, auth: Annotated[UserAuth, Depends(get_current_active_user)]):
    try:
        user: User = User.objects(user_id=user_id).exclude("id").first()
        if user is None:
            raise HTTPException(status_code=400,detail="User not found")
        org_ids = user.org_id
        orgs = Organization.objects(org_id__in=org_ids).exclude("id")
        orgs_dict = [org.to_mongo().to_dict() for org in orgs]

        return orgs_dict
    except HTTPException as http_exception:
        raise http_exception  # Re-raise the HTTPException to ensure FastAPI handles it
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@app.post("/api/create_organization", tags=["Organization"])
async def create_organization(user_id:str, name: str, auth: Annotated[UserAuth, Depends(get_current_active_user)]):
    try:
        user: User = User.objects(user_id=user_id).first()
        if user is None:
            raise HTTPException(status_code=400,detail="User not found")
        id = str(uuid.uuid4())
        invite_code = get_reproducible_code(id)
        org_record = Organization(
            name=name, 
            org_id=id,
            user_id=user_id,
            invite_code = invite_code
            )
        org_record.save()
        user.org_id.append(id)
        user.save()
        return org_record.org_id
    except HTTPException as http_exception:
        raise http_exception  # Re-raise the HTTPException to ensure FastAPI handles it
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@app.put("/api/update_organization", tags=["Organization"])
async def update_organization(user_id: str, org_id: str,name: str, auth: Annotated[UserAuth, Depends(get_current_active_user)]):
    try:
        org: Organization = Organization.objects(org_id=org_id).first()
        if org is None:
            raise HTTPException(status_code=400, detail="Organization not found")
        if org.user_id != user_id:
            raise HTTPException(status_code=400,detail="User is not permitted for changes")
        org.name = name
        org.save()
        return f"successfully updated organization"
    except HTTPException as http_exception:
        raise http_exception  # Re-raise the HTTPException to ensure FastAPI handles it
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@app.patch("/api/join_organization", tags=["Organization"])
async def join_organization(user_id: str, invite_code: str, auth: Annotated[UserAuth, Depends(get_current_active_user)]):
    try:
        org: Organization = Organization.objects(invite_code=invite_code).first()
        if org is None:
            raise HTTPException(status_code=400, detail="Organization not found")
        user: User = User.objects(user_id=user_id).first()
        if user is None:
            raise HTTPException(status_code=400,detail="User not found")
        if org.org_id not in user.org_id:
            user.org_id.append(org.org_id)
            user.save()
        else:
            raise HTTPException(status_code=400, detail="User already belongs to this org")
        
        return f"successfully updated organization"
    except HTTPException as http_exception:
        raise http_exception  # Re-raise the HTTPException to ensure FastAPI handles it
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    

@app.delete("/api/delete_organization", tags=["Organization"])
async def delete_organization(user_id: str,org_id: str, auth: Annotated[UserAuth, Depends(get_current_active_user)]):
    try:
        org: Organization = Organization.objects(org_id=org_id).first()
        user: User = User.objects(user_id=user_id).first()
        if user is None:
            raise HTTPException(status_code=400,detail="User not found")
        if org is None:
            raise HTTPException(status_code=400, detail="Organization not found")
        if org.user_id != user_id:
    
           
            user.org_id.remove(org_id)
            user.save()
        if org.user_id == user_id:
            usecases: List[Usecase] = Usecase.objects(org_id=org.org_id)
            for usecase in usecases:
                usecase_id = usecase.usecase_id
                value_scores: List[ValueScores] = ValueScores.objects(usecase_id=usecase_id)
                implementation_scores: List[ImplementationScores] = ImplementationScores.objects(usecase_id=usecase.usecase_id)
                for value_score in value_scores:
                    value_score.delete()
                for implementation_score in implementation_scores:
                    implementation_score.delete()
                usecase.delete()
            user.org_id.remove(org_id)
            org.delete()
       
        return f"successfully deleted organization"
    except HTTPException as http_exception:
        raise http_exception  # Re-raise the HTTPException to ensure FastAPI handles it
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/create_user", tags=["User"])
async def create_user(full_name, auth: Annotated[UserAuth, Depends(get_current_active_user)]):
    try:
        id = str(uuid.uuid4())
        user_record: User = User(
            user_id = id,
            full_name = full_name,
        )     
        user_record.save()
        return user_record.user_id
    except HTTPException as http_exception:
        raise http_exception
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@app.patch("/api/add_user_to_org", tags=["Organization","User"])
async def add_user_to_org(user_id, org_id, auth: Annotated[UserAuth, Depends(get_current_active_user)]):
    try:
        user: User = User.objects(user_id=user_id).first()  
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        user.org_id.append(org_id)
        user.save()
        return f"Added user {user_id} to organization {org_id}"
    except HTTPException as http_exception:
        raise http_exception
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/create_usecase", tags=["Usecase"])
async def create_usecase(org_id: str, name: str, desc: str, bigRisk: bool, risks: List[str], auth: Annotated[UserAuth, Depends(get_current_active_user)]):
    try:
        id = str(uuid.uuid4())
        org: Organization = Organization.objects(org_id=org_id).first()
        if not org:
            raise HTTPException(status_code=404, detail="Organization not found")
        usecase_record: Usecase = Usecase(
            usecase_id=id,
            org_id=org.org_id, 
            name=name, 
            description=desc, 
            bigRisk=bigRisk,
            risks=risks
            )
        usecase_record.save()
        return usecase_record.usecase_id
    except HTTPException as http_exception:
        raise http_exception
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@app.put("/api/update_usecase", tags=["Usecase"])
async def update_usecase(usecase_id: str, name: str, desc: str, bigRisk: bool,risks: List[str], auth: Annotated[UserAuth, Depends(get_current_active_user)]):
    try:
        usecase: Usecase = Usecase.objects(usecase_id=usecase_id).first()
        if not usecase:
            raise HTTPException(status_code=404, detail="Usecase not found")
        if name:
            usecase.name = name
        if desc:
            usecase.description = desc
        if bigRisk is not None:
            usecase.bigRisk = bigRisk
        if risks:
            usecase.risks = risks
      
        usecase.save()
        return usecase.usecase_id
    except HTTPException as http_exception:
        raise http_exception
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/api/delete_usecase", tags=["Usecase"])
async def delete_usecase(usecase_id: str, auth: Annotated[UserAuth, Depends(get_current_active_user)]):
    try:
       
        usecase: Usecase = Usecase.objects(usecase_id=usecase_id).first()
        
        if usecase is None:
            raise HTTPException(status_code=400, detail="Usecase not found")
        
        
    
        
        value_scores: List[ValueScores] = ValueScores.objects(usecase_id=usecase_id)
        implementation_scores: List[ImplementationScores] = ImplementationScores.objects(usecase_id=usecase.usecase_id)
       
        if value_scores:
            for value_score in value_scores:
                value_score.delete()
        if implementation_scores:
            for implementation_score in implementation_scores:
                implementation_score.delete()
        usecase.delete()
           
        return f"successfully deleted organization"
    except HTTPException as http_exception:
        raise http_exception  # Re-raise the HTTPException to ensure FastAPI handles it
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/create_valuescore", tags=["Usecase"])
async def create_valuescore(user_id: str, usecase_id: str, alignment: int, advantages: List[Dict[Any,Any]], savings: int, auth: Annotated[UserAuth, Depends(get_current_active_user)]):
    try:
        id = str(uuid.uuid4())
        usecase: Usecase = Usecase.objects(usecase_id=usecase_id).first()
        if not usecase:
            raise HTTPException(status_code=404, detail="Usecase not found")
        user: User = User.objects(user_id=user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        score = calculate_value_score(alignment,advantages,savings)
        
        #overwrite existing records by deleting them instead of updating (lazier and quicker for now lol)
        check_for_existing_record: ValueScores = ValueScores.objects(Q(user_id=user_id) & Q(usecase_id=usecase_id)).first()
        
        if check_for_existing_record:
            check_for_existing_record.delete()

        valuescore_record = ValueScores(
            score_id = id,
            usecase_id=usecase.usecase_id, 
            user_id=user.user_id,
            alignment = alignment,
            advantages = advantages,
            savings = savings,
            score = score
            )
        valuescore_record.save()
        return valuescore_record.to_json()
    except HTTPException as http_exception:
        raise http_exception
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@app.post("/api/create_implementationscore", tags=["Usecase"])
async def create_implementationscore(user_id: str, usecase_id: str, algorithms: List[int], processes: List[int],knowledge: List[int], data: List[int], time: int, auth: Annotated[UserAuth, Depends(get_current_active_user)]):
    try:
        id = str(uuid.uuid4())
        usecase: Usecase = Usecase.objects(usecase_id=usecase_id).first()
        if not usecase:
            raise HTTPException(status_code=404, detail="Usecase not found")
        user: User = User.objects(user_id=user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        score = calculate_implementation_score(data,algorithms,processes,knowledge,time)
        
        #overwrite existing records by deleting them instead of updating (lazier and quicker for now lol)
        check_for_existing_record: ImplementationScores = ImplementationScores.objects(Q(user_id=user_id) & Q(usecase_id=usecase_id)).first()
        
        if check_for_existing_record:
            check_for_existing_record.delete()

        implementationscore_record: ImplementationScores = ImplementationScores(
            score_id= id,
            usecase_id = usecase_id,
            user_id = user_id,
            data=data,
            algorithms=algorithms,
            processes=processes,
            knowledge=knowledge,
            time=time,
            score=score
        )
        
        implementationscore_record.save()
        return implementationscore_record.to_json()
    except HTTPException as http_exception:
        raise http_exception
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

@app.get("/api/get_implementationscore_for_usecase", tags=["Usecase"])
async def get_implementationscore_for_usecase(user_id: str, usecase_id: str, auth: Annotated[UserAuth, Depends(get_current_active_user)]):
    try:
        usecase: Usecase = Usecase.objects(usecase_id=usecase_id).first()
        if not usecase:
            raise HTTPException(status_code=404, detail="Usecase not found")
        user: User = User.objects(user_id=user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        implementationscore_record: ImplementationScores = ImplementationScores.objects(Q(user_id=user_id) & Q(usecase_id=usecase_id)).exclude("id").first()
        if implementationscore_record:
            return implementationscore_record.to_mongo().to_dict()
        else: return None
    except HTTPException as http_exception:
        raise http_exception
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
@app.get("/api/get_valuescore_for_usecase", tags=["Usecase"])
async def get_valuescore_for_usecase(user_id: str, usecase_id: str, auth: Annotated[UserAuth, Depends(get_current_active_user)]):
    try:
        usecase: Usecase = Usecase.objects(usecase_id=usecase_id).first()
        if not usecase:
            raise HTTPException(status_code=404, detail="Usecase not found")
        user: User = User.objects(user_id=user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        valuescore_record: ValueScores = ValueScores.objects(Q(user_id=user_id) & Q(usecase_id=usecase_id)).exclude("id").first()
        if valuescore_record:
            return valuescore_record.to_mongo().to_dict()
        else: return None
    except HTTPException as http_exception:
        raise http_exception
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
        
    



@app.get("/api/get_usecases_for_org", tags=["Organization","Usecase"])
async def get_usecases_for_org(org_id: str, auth: Annotated[UserAuth, Depends(get_current_active_user)]):
    try:
        org: Organization = Organization.objects(org_id=org_id).first()
        if not org:
            raise HTTPException(status_code=404, detail="Organization not found")
        usecases: List[Usecase] = Usecase.objects(org_id=org.org_id)
        for usecase in usecases:
            value_scores: List[ValueScores] = ValueScores.objects(usecase_id=usecase.usecase_id)
            implementation_scores: List[ImplementationScores] = ImplementationScores.objects(usecase_id=usecase.usecase_id)
            value_scores = [score for score in value_scores]
            implementation_scores = [score.score for score in implementation_scores]
            implementation_score, value_score = calculate_scores(implementation_scores,value_scores)
            usecase.value_score = value_score
            usecase.implementation_score = implementation_score
            usecase.save()
        result = []
        for usecase in usecases:
            usecase_dict = usecase.to_mongo().to_dict()
            usecase_dict.pop('_id', None)
            result.append(usecase_dict)
        return result
    except HTTPException as http_exception:
        raise http_exception
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
	exc_str = f'{exc}'.replace('\n', ' ').replace('   ', ' ')
	logging.error(f"{request}: {exc_str}")
	content = {'status_code': 10422, 'message': exc_str, 'data': None}
	return JSONResponse(content=content, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)




#HELPER FUNCTIONS

def base62_encode(num):
    characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    base = len(characters)
    encoded = []
    while num:
        num, rem = divmod(num, base)
        encoded.append(characters[rem])
    return ''.join(reversed(encoded))

def get_reproducible_code(uuid_string, length=12):
    # Hash the UUID4 string using SHA-256
    hash_object = hashlib.sha256(uuid_string.encode())
    hash_digest = hash_object.digest()

    # Convert the hash to an integer
    hash_int = int.from_bytes(hash_digest, byteorder='big')

    # Encode the integer as a base62 string
    base62_string = base62_encode(hash_int)

    # Ensure the string is exactly `length` characters long
    if len(base62_string) > length:
        return base62_string[:length]
    else:
        return base62_string.zfill(length)