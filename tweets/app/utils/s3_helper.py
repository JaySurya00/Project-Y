import boto3
from fastapi import FastAPI, File, UploadFile
from typing import Annotated

s3_client = boto3.client("s3")
BUCKET_NAME = "project-y"


async def upload_image(file: Annotated[UploadFile, File()]):

    try:
        file_content = await file.read()
        s3_client.put_object(
            Bucket=BUCKET_NAME,
            Key=file.filename,
            Body=file_content,
            ContentType=file.content_type,
        )
        file_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{file.filename}"
        return file_url
    except Exception as e:
        # Log the exception for debugging
        print(f"Error uploading file: {e}")
