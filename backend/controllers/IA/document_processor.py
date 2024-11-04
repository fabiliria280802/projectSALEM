import os
from document_utils import analyze_document, extract_key_data

DATA_FOLDER = './data/'

def process_data_folder(document_type):
    all_documents_data = []

    for file_name in os.listdir(DATA_FOLDER):
        file_path = os.path.join(DATA_FOLDER, file_name)
        print(f"Procesando archivo: {file_path}")

        text = analyze_document(file_path)
        key_data = extract_key_data(document_type, text)
        all_documents_data.append(key_data)

    return all_documents_data

if __name__ == "__main__":
    import sys
    document_type = sys.argv[2]
    all_data = process_data_folder(document_type)
    print(f"Datos extraídos de la carpeta {DATA_FOLDER}:")
    print(all_data)