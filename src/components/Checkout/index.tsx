import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from 'contexts/cart-context';
import CartProduct from 'components/Cart/CartProducts/CartProduct';
import formatPrice from 'utils/formatPrice';
import { saveOrder } from 'services/orderStorage';
import { v4 as uuidv4 } from 'uuid';
import * as S from './style';

interface City {
    nom: string;
    code: string;
    codesPostaux: string[];
}

interface AddressFeature {
    properties: {
        label: string;
        postcode: string;
        city: string;
    };
}

const Checkout = () => {
    const { products, total, clearCart } = useCart();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    // City Autocomplete
    const [citySearch, setCitySearch] = useState('');
    const [citiesResult, setCitiesResult] = useState<City[]>([]);
    const [citySelected, setCitySelected] = useState<Partial<City>>({});

    // Postal Code
    const [postalCode, setPostalCode] = useState('');

    // Address Autocomplete
    const [addressSearch, setAddressSearch] = useState('');
    const [addressResult, setAddressResult] = useState<AddressFeature[]>([]);
    const [addressSelected, setAddressSelected] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Fetch Cities
    const fetchCities = async () => {
        if (!citySearch || citySelected.nom === citySearch) {
            setCitiesResult([]);
            return;
        }
        try {
            const response = await axios.get('https://geo.api.gouv.fr/communes', {
                params: {
                    nom: citySearch,
                    fields: 'nom,code,codesPostaux,centre',
                    boost: 'population',
                    limit: 5
                }
            });
            setCitiesResult(response.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchCities();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [citySearch]);

    const handleSelectCity = (city: City) => {
        setCitySelected(city);
        setCitySearch(city.nom);
        setPostalCode(city.codesPostaux[0] || '');
        setCitiesResult([]);
    };

    // Fetch Addresses
    const fetchAddresses = async () => {
        if (!addressSearch || addressSelected) {
            setAddressResult([]);
            return;
        }
        try {
            const response = await axios.get('https://api-adresse.data.gouv.fr/search/', {
                params: {
                    q: addressSearch,
                    limit: 5
                }
            });
            setAddressResult(response.data.features);
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchAddresses();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [addressSearch]);

    const handleSelectAddress = (feature: AddressFeature) => {
        setAddressSearch(feature.properties.label);
        setAddressSelected(true);
        setAddressResult([]);

        // Optionally auto-fill city and postal code if not already set
        if (!citySelected.nom) {
            setCitySearch(feature.properties.city);
            setPostalCode(feature.properties.postcode);
        }
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddressSearch(e.target.value);
        setAddressSelected(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (products.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        setIsSubmitting(true);

        const order = {
            id: uuidv4(),
            customer: {
                firstName,
                lastName,
                email,
                address: addressSearch,
                city: citySearch,
                postalCode
            },
            products,
            total: total.totalPrice,
            date: new Date().toISOString()
        };

        try {
            saveOrder(order);
            alert(`Order placed successfully for ${firstName} ${lastName}!`);
            clearCart();
            navigate('/');
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <S.Container>
            <S.FormColumn>
                <S.Title>Shipping Details</S.Title>
                <form onSubmit={handleSubmit}>
                    <S.FormGroup>
                        <S.Label>First Name</S.Label>
                        <S.Input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </S.FormGroup>
                    <S.FormGroup>
                        <S.Label>Last Name</S.Label>
                        <S.Input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </S.FormGroup>
                    <S.FormGroup>
                        <S.Label>Email</S.Label>
                        <S.Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </S.FormGroup>

                    <S.Row>
                        <S.FormGroup>
                            <S.Label>City</S.Label>
                            <S.RelativeWrapper>
                                <S.Input
                                    type="text"
                                    value={citySearch}
                                    onChange={(e) => {
                                        setCitySearch(e.target.value);
                                        setCitySelected({});
                                    }}
                                    placeholder="Search for a city..."
                                    required
                                />
                                {citiesResult.length > 0 && (
                                    <S.SearchResults>
                                        {citiesResult.map((city) => (
                                            <S.SearchResultItem
                                                key={city.code}
                                                onClick={() => handleSelectCity(city)}
                                            >
                                                {city.nom} ({city.codesPostaux[0]})
                                            </S.SearchResultItem>
                                        ))}
                                    </S.SearchResults>
                                )}
                            </S.RelativeWrapper>
                        </S.FormGroup>

                        <S.FormGroup>
                            <S.Label>Postal Code</S.Label>
                            <S.Input
                                type="text"
                                value={postalCode}
                                readOnly
                                placeholder="Auto-filled"
                            />
                        </S.FormGroup>
                    </S.Row>

                    <S.FormGroup>
                        <S.Label>Address</S.Label>
                        <S.RelativeWrapper>
                            <S.Input
                                type="text"
                                value={addressSearch}
                                onChange={handleAddressChange}
                                placeholder="Start typing your address..."
                                required
                            />
                            {addressResult.length > 0 && (
                                <S.SearchResults>
                                    {addressResult.map((feature, index) => (
                                        <S.SearchResultItem
                                            key={index}
                                            onClick={() => handleSelectAddress(feature)}
                                        >
                                            {feature.properties.label}
                                        </S.SearchResultItem>
                                    ))}
                                </S.SearchResults>
                            )}
                        </S.RelativeWrapper>
                    </S.FormGroup>

                </form>
            </S.FormColumn>

            <S.SummaryColumn>
                <S.Title>Order Summary</S.Title>
                {products.map((p) => (
                    <CartProduct product={p} key={p.id} />
                ))}
                <S.TotalRow>
                    <span>Total:</span>
                    <span>{total.currencyFormat} {formatPrice(total.totalPrice, total.currencyId)}</span>
                </S.TotalRow>
                <S.Button onClick={handleSubmit} style={{ marginTop: '20px' }} disabled={isSubmitting}>
                    {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </S.Button>
            </S.SummaryColumn>
        </S.Container>
    );
};

export default Checkout;
