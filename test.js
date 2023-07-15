const docgen = require('react-docgen-typescript');

const options = {
  savePropValueAsString: true,
  shouldExtractValuesFromUnion: true,
};

const props = docgen.parse(
  './src/components/datepicker/picker/Picker.tsx',
  options,
)[0].props;
// Parse a file for docgen info
console.log(props.children);
