import React, { Component } from 'react';
import { connect } from 'react-redux';
import orderBy from 'lodash/orderBy';
import min from 'lodash/min';
import max from 'lodash/max';
import { Loading } from "../../common";
import StationsItem from './StationsItem';
import Header from './Header';

const m = ({ app, stations }) => ({ app, stations });

@connect(m)
export default class Stations extends Component {
  state = {
    order: 'asc',
    orderField: 'name',
    name: ''
  };

  sortData = () => {
    const { order, orderField } = this.state;
    const { stations: { stations } } = this.props;
    const buffer = Object.keys(stations).map(item =>
      ({
        name: item,
        min: min(stations[ item ].points),
        max: max(stations[ item ].points)
      }));


    if (orderField === 'name') {
      return orderBy(buffer, [ 'name' ], [ order ]);
    } else {
      return orderField === 'min'
        ? orderBy(buffer, [ 'min' ], [ order ])
        : orderBy(buffer, [ 'max' ], [ order ]);
    }
  };

  handleNameChange = e => {
    this.setState({ [ e.target.name ]: e.target.value.toLowerCase() });
  };

  handleChangeSort = sort => {
    if(this.state.orderField === sort) {
      this.setState({ order: this.state.order === 'asc' ? 'desc': 'asc' });
    } else {
      this.setState({ orderField: sort, order: 'asc' });
    }
  };

  render() {
    const { name, order, orderField } = this.state;
    const { stations: { stations, time, isFetching }, app: { clientKey } } = this.props;
    const data = this.sortData();

    if (isFetching) {
      return <Loading/>
    }

    return (
      <div className="container">
        <Header
          changeSort={this.handleChangeSort}
          order={order}
          orderField={orderField}
          name={name}
          nameChange={this.handleNameChange}
        />
        <div className="stations-container">
          {
            data.map(({ name }, i) => name.toLowerCase().indexOf(this.state.name) === 0
              && <StationsItem
                key={name}
                index={i}
                clientKey={clientKey}
                parentTime={time}
                name={name}
                {...stations[ name ]}/>
            )
          }
        </div>
      </div>
    );
  }
}