import { useSelector } from 'react-redux';
import { selectFlatNavigation } from 'app/store/fuse/navigationSlice';

function NavigationSearch(props) {
  const { variant, className } = props;
  const navigation = useSelector(selectFlatNavigation);
}

export default NavigationSearch;
