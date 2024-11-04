import os
import json
from dotenv import load_dotenv
from document_utils import analyze_document, extract_key_data

load_dotenv()

API_URL = os.getenv('API_URL')

def process_and_save_document(file_path, document_type):
    text = analyze_document(file_path)
    key_data = extract_key_data(document_type, text)
    return key_data

def main(file_path, document_type):
    result = process_and_save_document(file_path, document_type)
    print(json.dumps(result))

if __name__ == "__main__":
    import sys
    file_path = sys.argv[1]
    document_type = sys.argv[2]
    main(file_path, document_type)