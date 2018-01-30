import Sound from 'react-native-sound';

// Enable playback in silence mode (iOS only)
Sound.setCategory('Playback', false); // true to mixWithOthers

let playingSounds = [];
const sounds = [
  { filename: 'game_sound_wrong.mp3' },
  { filename: 'game_sound_correct.mp3' }
];

class SoundPlayer {
  static stopCurrentPlayingSounds() {
    for (let sound of playingSounds) {
      sound.stop(() => {
        sound.release();
      });
    }
    playingSounds = [];
  }

  static playWrongSound(callback) {
    return SoundPlayer.play(0, callback);
  }

  static playCorrectSound(callback) {
    return SoundPlayer.play(1, callback);
  }

  static play(soundKey, callback, shouldStopOther = true) {
    if (shouldStopOther) {
      SoundPlayer.stopCurrentPlayingSounds();
    }

    return new Promise((resolve, reject) => {
      let data = sounds[soundKey];
      let sound = new Sound(data.filename, Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.warn('Failed to load', data, error);
          reject(new Error('Failed to load ' + data.filename));
          return;
        }

        playingSounds.push(sound);
        sound.play(success => {
          // Release when it's done so we're not using up resources
          sound.release();

          if (success) {
            resolve(data);
            callback();
            return;
          }

          // reset the player to its uninitialized state (android only)
          // this is the only option to recover after an error occured and use the player again
          sound.reset();
          // failed due to audio decoding errors
          console.warn('Failed to play', soundKey, data.filename, sound._key);
          reject(new Error('Failed to play ' + data.filename));
        });
      }); // new Sound
    }); // new Promise
  }
}

export default SoundPlayer;
