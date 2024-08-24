from datetime import datetime
from pydantic import BaseModel
from typing import Optional

class Tweet(BaseModel):
    user_id: int
    username: str
    body: str
    media_file_url: Optional[str]=None
    created_at: datetime= datetime.utcnow()