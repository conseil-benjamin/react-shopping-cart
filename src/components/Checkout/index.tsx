import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from 'contexts/cart-context';
import CartProduct from 'components/Cart/CartProducts/CartProduct';
import formatPrice from 'utils/formatPrice';
import * as S from './style';

interface City {
    nom: string;
    code: string;
    codesPostaux: string[];
}

const Checkout = () => {
    const { products, total, clearCart } = useCart();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [citySearch, setCitySearch] = useState('');
    const [citiesResult, setCitiesResult] = useState<City[]>([]);
    const [citySelected, setCitySelected] = useState<Partial<City>>({});

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const fetchCities = async () => {
        if (!citySearch) {
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
            if (citySearch && citySearch !== citySelected.nom) {
                setCitySelected({});
            }
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
        setCitiesResult([]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (products.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        setIsSubmitting(true);

        const payload = {
            userId: 1, 
            date: new Date().toISOString().split('T')[0],
            products: products.map(p => ({ productId: p.id, quantity: p.quantity }))
        };

        try {
            await axios.post('https://fakestoreapi.com/carts', payload);
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
                    <S.FormGroup>
                        <S.Label>City</S.Label>
                        <S.RelativeWrapper>
                            <S.Input
                                type="text"
                                value={citySearch}
                                onChange={(e) => setCitySearch(e.target.value)}
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
                <S.Button onClick={handleSubmit} style={{ marginTop: '20px' }}>
                    Place Order
                </S.Button>
            </S.SummaryColumn>
        </S.Container>
    );
};

export default Checkout;
