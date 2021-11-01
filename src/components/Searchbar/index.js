import React from 'react'
import { Input } from 'reactstrap'

const Searchbar = () => {
  <div className='search' data-search-path='/app/layouts/search'>
    <Input
      name='searchKeyword'
      id='searchKeyword'
      placeholder={messages['menu.search']}
      value={this.state.searchKeyword}
      onChange={e => this.handleSearchInputChange(e)}
      onKeyPress ={e=> this.handleSearchInputKeyPress(e)}
    />
    <span className='search-icon' onClick={e => this.handleSearchIconClick(e)}>
      <i className='simple-icon-magnifier' />
    </span>
  </div>
}

