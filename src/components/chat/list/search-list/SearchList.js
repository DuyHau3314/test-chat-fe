import PropTypes from 'prop-types';
import '@components/chat/list/search-list/SearchList.scss';
import Avatar from '@components/avatar/Avatar';
import { useLocation, useNavigate, createSearchParams } from 'react-router-dom';

const SearchList = ({
  result,
  isSearching,
  searchTerm,
  setSelectedUser,
  setSearch,
  setIsSearching,
  setSearchResult,
  setComponentType
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  console.log('====result', result);

  const addUsernameToUrlQuery = (user) => {
    setComponentType('searchList');
    setSelectedUser(user);
    const url = `${location.pathname}?${createSearchParams({ username: user.username.toLowerCase(), id: user.id })}`;
    navigate(url);
    setSearch('');
    setIsSearching(false);
    setSearchResult([]);
  };

  const renderUserList = (user) => {
    return (
      <div
        data-testid="search-result-item"
        className="search-result-container-item"
        key={user.id}
        onClick={() => addUsernameToUrlQuery(user)}
      >
        <Avatar
          name={user.username}
          bgColor={user.avatarColor}
          textColor="#ffffff"
          size={40}
          avatarSrc={user.profilePicture}
        />
        <div className="username">{user.username}</div>
      </div>
    );
  };

  const renderRoomList = (room) => {
    return (
      <div
        data-testid="search-result-item"
        className="search-result-container-item"
        key={room.id}
        onClick={() => addUsernameToUrlQuery(room)}
      >
        <Avatar name={room.name} textColor="#ffffff" size={40} />
        <div className="username">{room.name}</div>
      </div>
    );
  };

  return (
    <div className="search-result">
      <div className="search-result-container">
        {!isSearching && result.data && (
          <>
            {result.data.users.length > 0 && (
              <div className="search-result-container-header">
                <span style={{ color: 'darkgray' }}>Users</span>
                {result.data.users.map((user) => renderUserList(user))}
              </div>
            )}

            {result.data.rooms.length > 0 && (
              <div className="search-result-container-header">
                <span style={{ color: 'darkgray' }}>Rooms</span>
                {result.data.rooms.map((room) => renderRoomList(room))}
              </div>
            )}
          </>
        )}

        {searchTerm && isSearching && result.length === 0 && (
          <div className="search-result-container-empty" data-testid="searching-text">
            <span>Searching...</span>
          </div>
        )}

        {searchTerm && !isSearching && result.length === 0 && (
          <div className="search-result-container-empty" data-testid="nothing-found">
            <span>Nothing found</span>
            <p className="search-result-container-empty-msg">We couldn&apos;t find any match for {searchTerm}</p>
          </div>
        )}
      </div>
    </div>
  );
};

SearchList.propTypes = {
  result: PropTypes.object,
  isSearching: PropTypes.bool,
  searchTerm: PropTypes.string,
  setSelectedUser: PropTypes.func,
  setSearch: PropTypes.func,
  setIsSearching: PropTypes.func,
  setSearchResult: PropTypes.func,
  setComponentType: PropTypes.func
};

export default SearchList;
