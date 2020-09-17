import React, {useState} from 'react';

import SHOP_DATA from './shop.data.js';
import CollectionPreview from '../../components/preview-collection/collection-preview.component';


function ShopPage (props) {
  const [collections, setCollections] = useState(SHOP_DATA);
  return (
    <div className="shop-page">
    {
      collections.map(({id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))
    }
    </div>
  )
}

export default ShopPage;