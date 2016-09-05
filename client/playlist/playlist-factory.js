angular.module('app.playlist')
.factory("Playlist", Playlist);

function Playlist($http){

  function fetchSongs(playlistID){
    return $http({
      method: 'GET',
      url: '/db/playlists/'+playlistID
    })
    .then(function(res){
      //songID, songTitle, songurl, upvotes, downvotes
      return res.data;

    })
    .catch(function(err){
      console.log("Error in fetching songs of playlist");
    })
  }

  function searchSong(searchInput){
    console.log("in playlist factory, searchsong", searchInput);
    return $http({
      method: 'GET',
      url: '/api/soundcloud/search',
      params: {
        q: searchInput
      }
    })
    .then(function(res){
      //songURL, title, duration
      return res.data;
    })
    .catch(function(err){
      console.log("Error in search song");
    })
  }

  function addSong(songObj, playlistID){
    return $http({
      method: 'POST',
      url: 'db/playlists/song/add',
      data: {
        playlistID: playlistID,
        songObj: songObj
      }
    })
    .then(function(res){
      return res.data;
      //fetch songs of playlist again
    })
    .catch(function(err){
      console.log("Error in adding song of playlist");
      return err;
    })
  }
  
  function removeSong(songID, playlistID){
    return $http({
      method: 'POST',
      url: 'db/playlists/song/remove',
      data: {
        playlistID: playlistID,
        songID: songID
      }
    })
    .then(function(res){
      return res.data;
    })
    .catch(function(err){
      console.log("Error in adding song of playlist");
    })
  }

  function upvote(songID, playlistID){
    return $http({
      method: 'POST',
      url: 'db/playlists/song/upvote',
      data: {
        playlistID: playlistID,
        songID: songID
      }
    })
    .then(function(res){
      return res.data;
    })
    .catch(function(err){
      console.log("Error in adding song of playlist");
    })
  }

  function downvote(songID, playlistID){
    return $http({
      method: 'POST',
      url: 'db/playlists/song/downvote',
      data: {
        playlistID: playlistID,
        songID: songID
      }
    })
    .then(function(res){
      return res.data;
    })
    .catch(function(err){
      console.log("Error in adding song of playlist");
    })
  }

  return{
    fetchSongs: fetchSongs,
    searchSong: searchSong,
    addSong: addSong,
    removeSong: removeSong,
    upvote: upvote,
    downvote: downvote
  }

}
