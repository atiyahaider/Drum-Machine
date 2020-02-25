const sounds = [
{ key: 'Q', id: 'High Hat', src: 'http://www.denhaku.com/r_box/mxr/hat_open.wav' },
{ key: 'W', id: 'Bass', src: 'http://www.burnkit2600.com/temp/HR-16/HR-16-WAVs/10-electronic%20kick2.wav' },
{ key: 'E', id: 'Tom Tom', src: 'http://electrongate.com/dmxfiles/ELTOM3.wav' },
{ key: 'A', id: 'Snare', src: 'http://www.denhaku.com/r_box/sr16/sr16sd/verynsty.wav' },
{ key: 'S', id: 'Kick', src: 'http://dight310.byu.edu/media/audio/FreeLoops.com/3/3/Free%20Drum%20Kick%2016-924-Free-Loops.com.mp3' },
{ key: 'D', id: 'Bongo', src: 'http://dight310.byu.edu/media/audio/FreeLoops.com/4/4/Korg%20Bongo%20Low-2496-Free-Loops.com.mp3' },
{ key: 'Z', id: 'Stick Hit', src: 'http://dight310.byu.edu/media/audio/FreeLoops.com/3/3/Drum%20Stick%20Hit-18711-Free-Loops.com.mp3' },
{ key: 'X', id: 'Clap', src: 'http://dight310.byu.edu/media/audio/FreeLoops.com/2/2/Clap%20Hit%20Free%20004-1686-Free-Loops.com.mp3' },
{ key: 'C', id: 'Cymbal', src: 'http://www.denhaku.com/r_box/sr16/sr16cym/cmbocrsh.wav' }];


class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  handleKeydown(e) {
    if (e.keyCode === this.props.letter.charCodeAt(0)) {
      this.handleClick();
    }
  }

  handleClick() {
    const drumKey = document.getElementById(this.props.id);
    $(drumKey).addClass('animated pulse');
    this.audio.currentTime = 0;
    this.audio.volume = this.props.volume;
    this.audio.play();
    this.props.handleDisplay(this.props.id);
    setTimeout(() => $(drumKey).removeClass('animated pulse'), 300);
  }

  render() {
    let drumClass = '';
    if (!this.props.power) {
      drumClass = 'drum-pad disabled';
      document.removeEventListener('keydown', this.handleKeydown);
    } else
    {
      switch (this.props.letter) {
        case 'Q':
        case 'W':
        case 'E':{
            drumClass = 'drum-pad blueBtns';
            break;
          }
        case 'A':
        case 'S':
        case 'D':{
            drumClass = 'drum-pad pinkBtns';
            break;
          }
        case 'Z':
        case 'X':
        case 'C':{
            drumClass = 'drum-pad orangeBtns';
            break;
          }}

      document.addEventListener('keydown', this.handleKeydown);
    }

    return (
      React.createElement("div", { className: drumClass, id: this.props.id, onClick: this.handleClick }, this.props.letter,
      React.createElement("audio", { class: "clip", id: this.props.letter, src: this.props.src,
        ref: ref => this.audio = ref })));



  }}


class Footer extends React.Component {
  render() {
    return (
      React.createElement("div", { id: "footer" },
      React.createElement("p", null, "Designed and coded by"),
      React.createElement("a", { target: "_blank", href: "https://s.codepen.io/atiyahaider/debug/oaZxeb/dGrXWdOKgPWM" }, "Atiya Haider")));


  }}


class DrumMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'Press or click any key',
      power: true,
      volume: 0.3 };

    this.handleDisplay = this.handleDisplay.bind(this);
    this.controlPower = this.controlPower.bind(this);
    this.adjustVolume = this.adjustVolume.bind(this);
  }

  handleDisplay(name) {
    if (this.state.power) {
      this.setState({ display: name });
    }
  }

  controlPower() {
    this.setState({ power: !this.state.power }, () => {
      if (!this.state.power) {
        this.setState({ display: '' });
      } else
      if (this.state.display === '') {
        this.setState({ display: 'Press or click any key' });
      }
    });
  }

  adjustVolume(e) {
    if (this.state.power) {
      this.setState({
        volume: e.target.value,
        display: "Volume: " + Math.round(e.target.value * 100) });

      setTimeout(() => this.setState({ display: '' }), 100);
    }
  }

  render() {
    const powerStyle = this.state.power ? {
      color: '#00cc00' } :
    { color: 'white' };

    return (
      React.createElement("div", null,
      React.createElement("div", { id: "drum-machine" },
      React.createElement("div", { id: "keys-pad" },
      React.createElement("div", { id: "display" }, this.state.display),

      React.createElement("div", { id: "drum-pads" },
      sounds.map((e) =>
      React.createElement(DrumPad, { id: e.id, letter: e.key, src: e.src, power: this.state.power, handleDisplay: this.handleDisplay, volume: this.state.volume })))),




      React.createElement("div", { id: "controls" },
      React.createElement("div", { id: "powerBtnSection" },
      React.createElement("div", { id: "powerBtn", onClick: this.controlPower },
      React.createElement("i", { class: "fa fa-power-off", style: powerStyle }))),


      React.createElement("div", { className: "volume-slider" },
      React.createElement("input", { id: "volume", type: "range", min: "0", max: "1", step: "0.01", value: this.state.volume, onChange: this.adjustVolume })),


      React.createElement("div", { id: "label" }, "Drum Machine"))),


      React.createElement(Footer, null)));


  }}
;

ReactDOM.render(React.createElement(DrumMachine, null), document.getElementById('drumApp'));