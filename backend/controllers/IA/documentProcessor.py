import requests
from analyze import analyze_document, extract_key_data

# URL del backend de Node.js
API_URL = 'http://localhost:5000/api'

# Función para procesar el documento y enviarlo al backend
def process_and_save_document(file_path, document_type):
    # Analizar el documento para extraer el texto
    text = analyze_document(file_path)

    # Extraer los datos clave del texto
    key_data = extract_key_data(document_type, text)

    # Dependiendo del tipo de documento, enviar la información al endpoint correspondiente
    if document_type == 'invoice':
        save_invoice(key_data)
    elif document_type == 'hes':
        save_hes(key_data)
    elif document_type == 'migo':
        save_migo(key_data)
    else:
        raise ValueError('Tipo de documento no soportado.')

# Función para guardar una factura
def save_invoice(data):
    endpoint = f"{API_URL}/invoices"
    response = requests.post(endpoint, json=data)
    print(response.json())

# Función para guardar un HES
def save_hes(data):
    endpoint = f"{API_URL}/hes"
    response = requests.post(endpoint, json=data)
    print(response.json())

# Función para guardar un MIGO
def save_migo(data):
    endpoint = f"{API_URL}/migos"
    response = requests.post(endpoint, json=data)
    print(response.json())

# Función principal
def main(file_path, document_type):
    process_and_save_document(file_path, document_type)

if __name__ == "__main__":
    # Ejemplo de uso
    file_path = 'path/to/document.pdf'
    document_type = 'invoice'  # Puede ser 'invoice', 'hes', o 'migo'
    main(file_path, document_type)