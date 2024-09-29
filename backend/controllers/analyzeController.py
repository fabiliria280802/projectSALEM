import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.optimizers import SGD
from tensorflow.keras.losses import CategoricalCrossentropy, MeanSquaredError
import numpy as np

def build_cnn_model(input_shape, num_classes):
    model = models.Sequential()
    model.add(layers.Conv2D(32, (3, 3), activation='relu', input_shape=input_shape))
    model.add(layers.MaxPooling2D((2, 2)))
    model.add(layers.Conv2D(64, (3, 3), activation='relu'))
    model.add(layers.MaxPooling2D((2, 2)))
    model.add(layers.Conv2D(64, (3, 3), activation='relu'))
    model.add(layers.MaxPooling2D((2, 2)))
    model.add(layers.Flatten())
    model.add(layers.Dense(64, activation='relu'))
    model.add(layers.Dense(num_classes, activation='softmax'))
    return model

def compile_cnn_model(model):
    sgd = SGD(learning_rate=0.01, momentum=0.9)
    loss_fn = CategoricalCrossentropy()
    mse_loss_fn = MeanSquaredError()

    def combined_loss(y_true, y_pred):
        return loss_fn(y_true, y_pred) + mse_loss_fn(y_true, y_pred)

    model.compile(optimizer=sgd, loss=combined_loss, metrics=['accuracy'])

def train_cnn_model(model, train_images, train_labels, epochs=10):
    model.fit(train_images, train_labels, epochs=epochs)

def preprocess_images(images):
    return images / 255.0

if __name__ == "__main__":
    # Cargar datos de entrenamiento de OCR (por ejemplo, imágenes de texto y etiquetas de caracteres)
    # Aquí deberías cargar las imágenes y etiquetas de entrenamiento
    # train_images, train_labels = ...

    # Definir el tamaño de entrada y la cantidad de clases (número de caracteres reconocidos)
    input_shape = (32, 32, 1)
    num_classes = 36

    model = build_cnn_model(input_shape, num_classes)
    compile_cnn_model(model)

    train_images = preprocess_images(train_images)
    train_cnn_model(model, train_images, train_labels, epochs=10)

    model.save("ocr_cnn_model.h5")

import sys
import json
import re
import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np

# Palabras clave para Facturas, HES y MIGO
KEYWORDS = {
    "factura": {
        "RUC válido de 13 dígitos": r'RUC\s+(\d{13})',
        "Número de factura": r'Número de factura\s+(\S+)',
        "Fecha de emisión": r'Fecha de emisión\s+(\S+)',
        # Agrega las demás palabras clave de la factura aquí...
    },
    "hes": {
        "Descripción del servicio": r'Descripción del servicio\s+(\S+)',
        "Código del servicio": r'Código del servicio\s+(\S+)',
        # Agrega las demás palabras clave del HES aquí...
    },
    "migo": {
        "Tipo de movimiento": r'Tipo de movimiento\s+(\S+)',
        "Número de documento del movimiento": r'Número de documento del movimiento\s+(\S+)',
        # Agrega las demás palabras clave del MIGO aquí...
    }
}

# Cargar el modelo CNN previamente entrenado para OCR
model = load_model("ocr_cnn_model.h5")

# Función para analizar el texto del documento
def analyze_document(text, doc_type):
    """
    Analiza el texto de un documento (factura, HES o MIGO) para verificar
    la presencia de palabras clave y su correspondiente valor.
    """
    analysis_result = {}
    missing_fields = []

    # Seleccionar palabras clave según el tipo de documento
    keywords = KEYWORDS.get(doc_type.lower(), {})

    for keyword, pattern in keywords.items():
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            analysis_result[keyword] = match.group(1)
        else:
            missing_fields.append(keyword)

    if missing_fields:
        analysis_result["valid"] = False
        analysis_result["missing_fields"] = missing_fields
    else:
        analysis_result["valid"] = True

    return analysis_result

# OCR usando el modelo CNN
def ocr_image(image):
    """
    Aplica el modelo CNN a la imagen para obtener el texto usando OCR.
    """
    # Preprocesar la imagen como se hizo en el entrenamiento
    image = np.expand_dims(image, axis=-1)  # Asegurarse de que tenga la dimensión correcta
    image = np.expand_dims(image, axis=0)   # Batch size de 1
    preds = model.predict(image)

    # Aquí convertiríamos la predicción en caracteres (esto dependerá del set de entrenamiento)
    predicted_text = "Texto de ejemplo"  # Reemplazar con la conversión real

    return predicted_text

# Integración principal
if __name__ == "__main__":
    input_type = sys.argv[1]  # "factura", "hes", "migo"
    input_image_path = sys.argv[2]  # Ruta de la imagen del documento

    # Cargar la imagen del documento (aquí se debe cargar y preprocesar la imagen)
    # image = load_image(input_image_path)

    # Realizar OCR
    text = ocr_image(image)

    # Analizar el texto del documento
    result = analyze_document(text, input_type)
    print(json.dumps(result, indent=4))