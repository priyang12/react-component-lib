import './Search.scss';
import Input from '../../components/Input';
import Label from '../../components/Label';
import Button from '../../components/Button/Button';
function Search() {
   return (
      <div className="search-container">
         <Label htmlFor="Search" hidden>
            Search Product
         </Label>
         <Input
            type="text"
            placeholder="Find your Product"
            id="Search"
            style={{
               width: '100%',
            }}
         />
         <Button label="Search" />
      </div>
   );
}
export default Search;
