import Input from './lib/components/Input';
import Label from './lib/components/Label';
import FormInput from './lib/Module/FormInput';
import './lib/styles/Global.scss';

function App() {
   return (
      <div className="">
         <FormInput>
            <Label htmlFor="Search" size="medium">
               Search
            </Label>
            <Input type="text" id="Search" size="large" />
         </FormInput>
      </div>
   );
}

export default App;
