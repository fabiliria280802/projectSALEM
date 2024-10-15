import os
from document_processor import analyze_document, extract_key_data

# Ruta de la carpeta data
DATA_FOLDER = './data/'

# Función para procesar todos los archivos de la carpeta data
def process_data_folder(document_type):
    # Lista para almacenar todos los datos extraídos
    all_documents_data = []

    # Recorrer todos los archivos en la carpeta data/
    for file_name in os.listdir(DATA_FOLDER):
        file_path = os.path.join(DATA_FOLDER, file_name)

        # Procesar el documento y extraer el texto
        print(f"Procesando archivo: {file_path}")
        text = analyze_document(file_path)

        # Extraer los datos clave según el tipo de documento
        key_data = extract_key_data(document_type, text)
        all_documents_data.append(key_data)

    return all_documents_data

# Ejemplo de uso
if __name__ == "__main__":
    document_type = 'invoice'  # Cambia el tipo de documento según sea necesario ('invoice', 'hes', 'migo')
    all_data = process_data_folder(document_type)
    print(f"Datos extraídos de la carpeta {DATA_FOLDER}:")
    print(all_data)