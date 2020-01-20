import React, { useState, useEffect} from 'react';

import api from '../../services/api';

import { MaterialIcons } from '@expo/vector-icons';

import { formatNumber } from '../../utils/formatNumber';

import { Container,
    Header,
    Info,
    Title,
    SubTitle, 
    SeeMoreButton, 
    SeeMoreText,
    OfferList,
    ItemInfo,
    Item,
    ItemImage,
    ItemTitle,
    ItemPrice,
    OldPrice,
    Price
     } from './styles';

export default function Offers() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    async function loadOffers() {
      const response = await api.get('offers');

      const data = response.data.map(offer => ({
        id: offer.id,
        offer_url: offer.offer_url,
        title: offer.title,
        newPrice: formatNumber(offer.newPrice),
        price: formatNumber(offer.price),
        // newPrice: `R$: ${offer.newPrice}`,
      }))

      setOffers(data);
    }
    loadOffers();
  }, [])

  return (
    <Container>
      <Header>
        <Info>
          <Title>Comida boa e barata</Title>
          <SubTitle>Pratos com frete grátis</SubTitle>
        </Info>
        <SeeMoreButton onPress={() => {}}>
          <SeeMoreText>Ver mais</SeeMoreText>
        </SeeMoreButton>
      </Header>

      <OfferList horizontal={true}>
        {offers.map(offer => (
        <Item key={offer.id}>
          <ItemImage source={{ uri: offer.offer_url}} />
          <ItemInfo>
            <ItemTitle>{offer.title}</ItemTitle>
            <ItemPrice>
              <Price>{offer.newPrice}</Price>
              <OldPrice>{offer.price}</OldPrice>
              <MaterialIcons name="local-offer" size={15} color="#000" />
            </ItemPrice>
          </ItemInfo>
        </Item>
        ))}
      </OfferList>
    </Container>
  );
}
