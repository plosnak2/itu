import firebase from "firebase";

export function uploadRecipe(food, uploadComplete) {
    firebase.firestore()
    .collection('recipe')
    .add(food).then((snapshot) => {
        snapshot.set(food);
    }).then(() => uploadComplete(food))
    .catch((error) => console.log(error));
}