import cv2
import numpy as np
import pytesseract
import fitz

# Función para convertir PDF a texto directamente usando PyMuPDF
def extract_text_from_pdf(pdf_path):
    document = fitz.open(pdf_path)
    text = ""
    for page_num in range(document.page_count):
        page = document.load_page(page_num)
        text += page.get_text("text")
    return text

# Función para preprocesar imágenes (eliminar ruido, binarizar, etc.)
def preprocess_image(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    denoised = cv2.bilateralFilter(gray, 11, 17, 17)

    _, binary = cv2.threshold(denoised, 150, 255, cv2.THRESH_BINARY)

    cleaned = cv2.fastNlMeansDenoising(binary, None, 30, 7, 21)

    return cleaned

# Función OCR para extraer texto usando pytesseract en imágenes
def extract_text_from_image(image):
    text = pytesseract.image_to_string(image)
    return text

# Función principal para analizar el archivo (PDF o imágenes)
def analyze_document(file_path):
    file_extension = file_path.split('.')[-1].lower()

    if file_extension == 'pdf':
        # Usamos PyMuPDF para extraer texto directamente desde el PDF
        text = extract_text_from_pdf(file_path)
        return text

    elif file_extension in ['jpg', 'png']:
        # Si es una imagen, aplicamos el procesamiento de imágenes y OCR
        image = cv2.imread(file_path)
        preprocessed_image = preprocess_image(image)
        text = extract_text_from_image(preprocessed_image)
        return text

    else:
        raise ValueError('Formato de archivo no soportado.')

# Extraer datos clave del texto
def extract_key_data(document_type, text):
    key_data = {}

    if document_type == 'invoice':
        # Extraer palabras clave de la factura
        key_data['invoice_number'] = extract_pattern(r'Factura N°:\s*(\d+)', text)
        key_data['provider_name'] = extract_pattern(r'Proveedor:\s*(\w+)', text)
        key_data['total'] = extract_pattern(r'Total:\s*(\d+\.\d+)', text)

    elif document_type == 'hes':
        # Extraer palabras clave del HES
        key_data['service_code'] = extract_pattern(r'Servicio N°:\s*(\d+)', text)
        key_data['provider_name'] = extract_pattern(r'Proveedor:\s*(\w+)', text)
        key_data['total'] = extract_pattern(r'Total:\s*(\d+\.\d+)', text)

    elif document_type == 'migo':
        # Extraer palabras clave del MIGO
        key_data['movement_number'] = extract_pattern(r'Movimiento N°:\s*(\d+)', text)
        key_data['provider_name'] = extract_pattern(r'Proveedor:\s*(\w+)', text)
        key_data['total'] = extract_pattern(r'Total:\s*(\d+\.\d+)', text)

    return key_data

# Función auxiliar para extraer datos con regex
import re
def extract_pattern(pattern, text):
    match = re.search(pattern, text)
    if match:
        return match.group(1)
    return None