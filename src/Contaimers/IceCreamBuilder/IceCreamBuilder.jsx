import { Component } from 'react';
import Builder from '../../Components/Builder/Builder';
import IceCream from '../../Components/IceCream/IceCream';
import classes from './IceCreamBuilder.module.css';


export default class IceCreamBuilder extends Component {
    state = {
        items: {},
        scoops: [],
        totalPrice: 0,
        loading: true,
        error: false,
    };

    componentDidMount() {
        fetch('https://react-course-27447.firebaseio.com/items.json')
            .then((response) => response.json())
            .then((responeData) => {
                if (responeData && Object.keys(responeData).length > 0) {
                    this.setState({
                        items: responeData,
                        loading: false,
                        error: false,
                    });
                } else {
                    throw new Error('No data');
                }
            })
            .catch(() => {
                // fallback/mock data
                this.setState({
                    items: {
                        chocolate: 60,
                        vanilla: 40,
                        strawberry: 50,
                        orange: 30,
                        lemon: 20,
                    },
                    loading: false,
                    error: true,
                });
            });
    }

    addScoop = (scoop) => {
        const { scoops, items } = this.state;
        const workingScoops = [...scoops];
        workingScoops.push(scoop);
        this.setState((prevState) => ({
            scoops: workingScoops,
            totalPrice: prevState.totalPrice + items[scoop],
        }));
    };

    removeScoop = (scoop) => {
        const { scoops, items } = this.state;
        const workingScoops = [...scoops];
        const scoopIndex = workingScoops.findIndex((sc) => sc === scoop);
        if (scoopIndex !== -1) {
            workingScoops.splice(scoopIndex, 1);
            this.setState((prevState) => ({
                scoops: workingScoops,
                totalPrice: prevState.totalPrice - items[scoop],
            }));
        }
    };

    render() {
        const { items, totalPrice, scoops, loading, error } = this.state;
        return (
            <>
                <IceCream scoops={scoops} />
                {loading ? (
                    <div style={{ textAlign: 'center', margin: '2rem' }}>Loading flavors...</div>
                ) : (
                    <Builder
                        items={items}
                        price={totalPrice}
                        add={this.addScoop}
                        remove={this.removeScoop}
                        scoops={scoops}
                    />
                )}
                {error && !loading && (
                    <div style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>
                        Could not load flavors from server. Showing default flavors.
                    </div>
                )}
            </>
        );
    }
                                price={totalPrice}
                                add={this.addScoop}
                                remove={this.removeScoop}
                                scoops={scoops}
                            />
                        )}
                        {error && !loading && (
                            <div style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>
                                Could not load flavors from server. Showing default flavors.
                            </div>
                        )}
                    </>
                );
            }
            return {
                scoops: workingScoops,
                totalPrice: prevState.totalPrice - items[scoop],
            };
        });
    };

    render() {
        const { items, totalPrice, scoops } = this.state;
        return (
            <div className={['container', classes.container].join(' ')}>
                <IceCream scoops={scoops} />
                <Builder
                    items={items}
                    price={totalPrice}
                    add={this.addScoop}
                    remove={this.removeScoop}
                    scoops={scoops}
                />
            </div>
        );
    }
}