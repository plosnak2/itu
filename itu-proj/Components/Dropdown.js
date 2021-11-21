import DropDownPicker from 'react-native-dropdown-picker';
import React, {useState, useEffect} from 'react';
import { IngredientRef } from '../firebaseConfig';

const Dropdown = ({set}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
        IngredientRef.onSnapshot((QuerySnapshot) => {
            let ingredients_data = [];
            QuerySnapshot.forEach((ingredients) => {               
                ingredients.data().values.map(item => {
                    ingredients_data.push({label: item, value: item})
              })                
            });
            setItems(ingredients_data)
        });
       /*const ingredients = await IngredientRef.doc("7pvY5SCEhJWcJt7IBcY9").get();
       let ingredients_data = []; 
       console.log(ingredients.data())
       ingredients.data().values.map(item => {
            ingredients_data.push({label: item, value: item})
      }) 
       setItems(ingredients_data)*/
    })();
 }, [])

  return (
    <DropDownPicker
    searchable={true}
    searchPlaceholder="Zadajte ingredienciu, ktorú hľadáte"
    itemSeparator={true}
    
      multiple={true}
      min={0}
      max={items.length}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder="Vyberte ingrediencie"
      onChangeValue={(value) => {
          set(value);
      }}
    />
  );
}
export default Dropdown