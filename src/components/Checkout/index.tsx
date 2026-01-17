import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from 'contexts/cart-context';
import CartProduct from 'components/Cart/CartProducts/CartProduct';
import formatPrice from 'utils/formatPrice';
import { saveOrder } from 'services/orderStorage';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
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

    // Autocomplétion ville
    const [citySearch, setCitySearch] = useState('');
    const [citiesResult, setCitiesResult] = useState<City[]>([]);
    const [citySelected, setCitySelected] = useState<Partial<City>>({});

    // Code postal lié à la ville sélectionnée (auto-rempli)
    const [postalCode, setPostalCode] = useState('');

    // Autocomplétion adresse
    const [addressSearch, setAddressSearch] = useState('');
    const [addressResult, setAddressResult] = useState<AddressFeature[]>([]);
    const [addressSelected, setAddressSelected] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    // Récupère les communes via l'API gouvernementale (limitée et boostée par population)
    const fetchCities = async () => {
        // Ne pas appeler si la recherche est vide ou si l'utilisateur a déjà sélectionné la même ville
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

    // Debounce pour éviter d'appeler l'API à chaque frappe
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchCities();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [citySearch]);

    // Lors de la sélection d'une ville, mettre à jour l'état et pré-remplir le code postal
    const handleSelectCity = (city: City) => {
        setCitySelected(city);
        setCitySearch(city.nom);
        setPostalCode(city.codesPostaux[0] || '');
        setCitiesResult([]);
    };

    // Récupère les adresses via l'API d'adresses (autocomplétion)
    const fetchAddresses = async () => {
      // Si la recherche est vide ou si une adresse a déjà été sélectionnée, rien à faire
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

    // Debounce pour l'autocomplétion d'adresse
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchAddresses();
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [addressSearch]);

    // Remplit le champ adresse et, si la ville n'est pas choisie, pré-remplit la ville et le code postal
    const handleSelectAddress = (feature: AddressFeature) => {
        setAddressSearch(feature.properties.label);
        setAddressSelected(true);
        setAddressResult([]);

        if (!citySelected.nom) {
            setCitySearch(feature.properties.city);
            setPostalCode(feature.properties.postcode);
        }
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Si l'utilisateur modifie le texte, on désactive le flag "sélectionné"
        setAddressSearch(e.target.value);
        setAddressSelected(false);
    };

    // Validation et enregistrement de la commande
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

      // Vérifier que le panier n'est pas vide
      if (products.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Cart is empty',
                text: 'Please add some products to your cart.',
                confirmButtonColor: '#eabf00'
            });
            return;
        }

        setIsSubmitting(true);

      // Construire l'objet commande qui sera sauvegardé localement
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

          // Retour visuel à l'utilisateur avant redirection
          await Swal.fire({
                icon: 'success',
                title: 'Order placed successfully!',
                text: `Thank you, ${firstName} ${lastName}. Redirecting to home...`,
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                toast: true,
                position: 'top-end'
            });

            // Nettoyer le panier et rediriger
            clearCart();
            navigate('/');
        } catch (error) {
            console.error('Error placing order:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to place order. Please try again.',
                confirmButtonColor: '#eabf00'
            });
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

                      {/* Autocomplétion ville */}
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

                  {/* Autocomplétion adresse */}
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

          {/* Résumé de la commande */}
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
