import React, { useEffect, useState } from "react";

import { Card, Button, Form } from "react-bootstrap";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { projectFirestore } from "../firebase/config";

import { collection, addDoc } from "firebase/firestore";

import { storage } from "../firebase/config";

import { uploadBytesResumable } from "firebase/storage";

import { useUser } from "../components/UserContext";

import { kategorieFullName, kategorie } from "../data/kategore";

const AddSchoolBook = () => {
  const user = useUser();

  const [name, setName] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);

  const [pictureOfBook, setPictureOfBook] = useState("");

  // Funkce pro nahrání obrázku na Firebase Storage
  const uploadPictureToStorage = async (file) => {
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setPictureOfBook(downloadURL);
          if (downloadURL) {
            return downloadURL;
          } else {
            console.log("downloadURL is empty");
          }
        });
      },
    );
  };

  function resizeImage(file, maxWidth, maxHeight) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = URL.createObjectURL(file);

      image.onload = () => {
        const widthRatio = maxWidth / image.width;
        const heightRatio = maxHeight / image.height;
        const ratio = Math.min(widthRatio, heightRatio);
        const newWidth = image.width * ratio;
        const newHeight = image.height * ratio;

        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, newWidth, newHeight);

        canvas.toBlob((blob) => {
          const resizedFile = new File([blob], file.name, { type: file.type });
          resolve(resizedFile);
        }, file.type);
      };

      image.onerror = () => {
        reject(new Error("Error loading the image."));
      };
    });
  }

  function getItemByIndex(list1, list2, item) {
    const index = list1.indexOf(item);
    if (index !== -1) {
      return list2[index];
    }
    return null;
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    // Snížení rozlišení fotky na 800x600
    const resizedImage = await resizeImage(selectedFile, 624, 468);

    // Odeslání fotky na server nebo další zpracování

    await uploadPictureToStorage(resizedImage);
  };

  async function writeRecordToFirestore(collectionName, data) {
    try {
      const docRef = await addDoc(
        collection(projectFirestore, collectionName),
        data,
      );
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  useEffect(() => {
    if (!pictureOfBook) return;
    const newRecord = {
      title: name,
      description: description,
      priceRange: price,
      img: pictureOfBook,
      stillAvilable: true,
      owner: user.displayName,
      // selectedOptions: selectedOptions,
    };

    if (newRecord) {
      console.log(newRecord);

      const category = getItemByIndex(
        kategorieFullName,
        kategorie,
        selectedOptions[0],
      );
      writeRecordToFirestore(category, newRecord);
      console.log("Data written to Firestore");
    }
  }, [pictureOfBook]);

  const options = kategorieFullName;

  return (
    <Card style={{ marginTop: "20px" }}>
      <Card.Body>
        <Card.Title>Přidat učebnici</Card.Title>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Název učebnice"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Form.Control
              as="select"
              multiple
              style={{ marginTop: "20px", marginBottom: "20px" }}
              value={selectedOptions}
              onChange={(e) =>
                setSelectedOptions(
                  Array.from(
                    e.target.selectedOptions,
                    (option) => option.value,
                  ),
                )
              }
              required
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Control>
            <Form.Control
              type="text"
              placeholder="Popis stavu učebnice"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Cenové rozpětí"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="file"
              style={{ marginTop: "20px", marginBottom: "20px" }}
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </Form.Group>
          <Button variant="primary" onClick={onSubmit}>
            Přidat
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddSchoolBook;
