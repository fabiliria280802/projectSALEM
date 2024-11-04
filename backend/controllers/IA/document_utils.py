import re
import json

def load_document_schema():
    with open('controllers/document_schemas.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def analyze_document(file_path):
    with open(file_path, 'rb') as f:
        return f.read().decode('latin-1')

def extract_key_data(document_type, text):
    schema = load_document_schema()
    fields = schema[document_type]["fields"]
    extracted_data = {}

    for field, keyword in fields.items():
        regex = re.compile(rf"{keyword}:\s*(.+)", re.IGNORECASE)
        match = regex.search(text)
        if match:
            extracted_data[field] = match.group(1).strip()

    return extracted_data
