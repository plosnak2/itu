/**
 * Author: Jozef Čásar (xcasar)
 * This is logical and graphic component that displays the filter, where user can choose the ingredients
 */
import DropDownPicker from 'react-native-dropdown-picker';
import React, {useState, useEffect} from 'react';
import { IngredientRef } from '../firebaseConfig';

const Dropdown = ({set}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([]);

  //get all ingredients used in recipes from database
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
    })();
 }, [])

 //display filter
  return (
    <DropDownPicker
    searchable={true}
    searchPlaceholder="Zadajte ingredienciu, ktorú hľadáte"
    itemSeparator={true}
    mode='BADGE'
    badgeDotColors={'orange'}
    badgeColors={['#0782F9']}
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