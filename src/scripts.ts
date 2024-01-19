import * as Tone from 'tone';

const synth = new Tone.MonoSynth({
  portamento: 0.02,
  oscillator: {
    type: 'square',
  },
  envelope: {
    attack: 0.005,
    decay: 0.2,
    sustain: 0.4,
    release: 1.4,
  },
  filterEnvelope: {
    attack: 0.005,
    decay: 0.1,
    sustain: 0.05,
    release: 0.8,
    baseFrequency: 300,
    octaves: 4,
  },
}).toDestination();

function getRandomSparkleColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function createSparkles() {
  const section = document.querySelector('.xylophone-section') as HTMLElement;
  const createSparkle = document.createElement('div');
  createSparkle.classList.add('sparkle');

  const randomTopPosition = Math.random() * section.offsetHeight;
  const randomLeftPosition = Math.random() * section.offsetWidth;

  createSparkle.style.top = `${randomTopPosition}px`;
  createSparkle.style.left = `${randomLeftPosition}px`;

  const randomSparkleColor = getRandomSparkleColor();
  createSparkle.style.backgroundColor = randomSparkleColor;

  section.appendChild(createSparkle);

  setTimeout(() => {
    createSparkle.remove();
  }, 4000);
}

function createBubble() {
  const header = document.querySelector('header');
  const createElement = document.createElement('span');
  const size = Math.random() * 5;

  createElement.style.width = `${5}${size}px`;
  createElement.style.height = `${5}${size}px`;

  const randomLeftPosition = Math.random() * header.offsetWidth;
  createElement.style.left = `${randomLeftPosition}px`;

  const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
  createElement.style.background = randomColor;

  header.appendChild(createElement);

  setTimeout(() => {
    createElement.remove();
  }, 4000);
}

document.addEventListener('DOMContentLoaded', () => {
  setInterval(createSparkles, 50);
  setInterval(createBubble, 50);

  const keys = document.querySelectorAll('.key');

  keys.forEach((key) => {
    key.addEventListener('click', async () => {
      await Tone.start();
      const note = key.querySelector('.note').textContent;
      synth.triggerAttackRelease(note, '8n');

      key.classList.toggle('clicked');

      setTimeout(() => {
        key.classList.remove('clicked');
      }, 1000);
    });
  });
});
