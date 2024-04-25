import numpy as np
import json
from glob import glob
from PIL import Image
from datetime import datetime
import shutil
import os

def add_image(i,image_path,authors,description,tags):
    image_folder = image.replace("\\","/")
    image_name = image_folder.split("/")[-1]
    extension = image_name.split(".")[-1]
    image_name_new = "{:06d}.{}".format(i,extension)
    img = Image.open(image)
    height, width = img.size
    shutil.copy(image_path,image_path.replace(image_name,image_name_new).replace("Img","Img_renamed"))

    metadata_img = {
            "filename": image_name_new,
            "title": image_name.split(".")[-2],
            "extension": extension,
            "description": description,
            "url": image_folder,
            "authors": authors,
            "image_size": {"height": height, "width": width},
            "uploaded_at": str(datetime.now()),
            "tags": tags
        }
    
    return metadata_img

if __name__ == '__main__':
    images = glob("Img/*")
    images_metadata = []
    for i, image in enumerate(images):
        author_names = "Author{}".format(i)
        description = "Dummy description {}.".format(i)
        tags = ["tag{}".format(i*3),"tag{}".format(i*3+1),"tag{}".format(i*3+2)]
        metadata_img = add_image(i,image,author_names,description,tags)
        images_metadata.append(metadata_img)
    metadata_dict = {"images": images_metadata}

    with open('metadata_0.json', 'w') as f:
        json.dump(metadata_dict, f)
