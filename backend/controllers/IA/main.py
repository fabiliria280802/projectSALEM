import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, models
from sklearn.model_selection import train_test_split
from analyze import analyze_document

# Crear un modelo CNN
def create_cnn_model(input_shape, num_classes):
    model = models.Sequential()

    # Primera capa convolucional
    model.add(layers.Conv2D(32, (3, 3), activation='relu', input_shape=input_shape))
    model.add(layers.MaxPooling2D((2, 2)))

    # Segunda capa convolucional
    model.add(layers.Conv2D(64, (3, 3), activation='relu'))
    model.add(layers.MaxPooling2D((2, 2)))

    model.add(layers.Conv2D(128, (3, 3), activation='relu'))
    model.add(layers.MaxPooling2D((2, 2)))

    model.add(layers.Flatten())
    model.add(layers.Dense(128, activation='relu'))
    model.add(layers.Dense(num_classes, activation='softmax'))

    model.compile(optimizer='sgd',
                  loss='categorical_crossentropy',
                  metrics=['accuracy'])

    return model

# Entrenar el modelo CNN
def train_cnn_model(X, y, input_shape, num_classes):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = create_cnn_model(input_shape, num_classes)

    history = model.fit(X_train, y_train, epochs=10, validation_data=(X_test, y_test))

    test_loss, test_acc = model.evaluate(X_test, y_test, verbose=2)

    print(f"Precisión en los datos de prueba: {test_acc}")

    return model, history

def main():
    file_path = '../../data/factura01-test.pdf'
    text = analyze_document(file_path)
    print(f"Texto extraído: {text}")

    X = np.random.rand(1000, 32, 32, 1)
    y = np.random.randint(0, 10, 1000)

    y = tf.keras.utils.to_categorical(y, 10)

    input_shape = (32, 32, 1)
    num_classes = 10

    model, history = train_cnn_model(X, y, input_shape, num_classes)

    model.save("ocr_cnn_model.h5")

if __name__ == "__main__":
    main()