import Rebix from 'react-rebix';
import RebixConfig from './RebixConfig';

export default function RebixComponent(BaseComponentImpl, componentConfig) {
    return Rebix.createComponent(RebixConfig, BaseComponentImpl, componentConfig);
}