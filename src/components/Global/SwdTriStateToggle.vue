<template>
  <div class="flex justify-center w-full">
    <div class="switch-toggle switch-3 switch-holo">
      <input id="on" name="state-d" type="radio" checked="" />
      <label for="on" @click="change('owner')">Owner</label>

      <input id="na" name="state-d" type="radio" disabled checked="checked" />
      <label for="na" @click="change('n/a')">N/A</label>

      <input id="off" name="state-d" type="radio" />
      <label for="off" @click="change('spouse')">Spouse/Partner</label>

      <a></a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SwdTriStateToggle',
  setup() {
    const change = (value) => {
      console.log('value - ', value)
    }

    return {
      change,
    }
  },
}
</script>

<style scoped>
.switch-toggle {
  width: 400px;
}

.switch-toggle label:not(.disabled) {
  cursor: pointer;
}

.switch-toggle a,
.switch-light span span {
  display: none;
}

@media only screen {
  .switch-light {
    position: relative;
    display: block;
  }
  .switch-light::after {
    clear: both;
    content: '';
    display: table;
  }
  .switch-light *,
  .switch-light *:before,
  .switch-light *:after {
    box-sizing: border-box;
  }
  .switch-light a {
    display: block;
    transition: all 0.2s ease-out;
  }
  .switch-light label,
  .switch-light > span {
    line-height: 2em;
  }
  .switch-light input:focus ~ span a,
  .switch-light input:focus + label {
    outline: 0;
    outline-offset: 0;
  }
}
@media only screen and (-webkit-min-device-pixel-ratio: 0) {
  .switch-light input:focus ~ span a,
  .switch-light input:focus + label {
    outline: 0;
    outline-offset: 0;
  }
}

@media only screen {
  .switch-light input {
    position: absolute;
    opacity: 0;
    z-index: 3;
  }
  .switch-light input:checked ~ span a {
    right: 0%;
  }
  .switch-light strong {
    font-weight: inherit;
  }
  .switch-light > span {
    position: relative;
    overflow: hidden;
    display: block;
    min-height: 2em;
    padding: 0;
    text-align: left;
  }
  .switch-light span span {
    position: relative;
    z-index: 2;
    display: block;
    float: left;
    width: 50%;
    text-align: center;
    user-select: none;
  }
  .switch-light a {
    position: absolute;
    right: 50%;
    top: 0;
    z-index: 1;
    display: block;
    width: 50%;
    height: 100%;
    padding: 0;
  }
  .switch-light.row {
    display: flex;
  }
  .switch-light .alert-light {
    color: #333;
  }
  .switch-toggle {
    position: relative;
    display: block;
    padding: 0 !important;
  }
  .switch-toggle::after {
    clear: both;
    content: '';
    display: table;
  }
  .switch-toggle *,
  .switch-toggle *:before,
  .switch-toggle *:after {
    box-sizing: border-box;
  }
  .switch-toggle a {
    display: block;
    transition: all 0.2s ease-out;
  }
  .switch-toggle label,
  .switch-toggle > span {
    line-height: 2em;
  }
  .switch-toggle input:focus ~ span a,
  .switch-toggle input:focus + label {
    outline: 0;
    outline-offset: 0;
  }
}
@media only screen and (-webkit-min-device-pixel-ratio: 0) {
  .switch-toggle input:focus ~ span a,
  .switch-toggle input:focus + label {
    outline: 0;
    outline-offset: 0;
  }
}

@media only screen {
  .switch-toggle input {
    position: absolute;
    left: 0;
    opacity: 0;
  }
  .switch-toggle input + label {
    position: relative;
    z-index: 2;
    display: block;
    float: left;
    padding: 0 0.5em;
    margin: 0;
    text-align: center;
  }
  .switch-toggle a {
    position: absolute;
    top: 0;
    left: 0;
    padding: 0;
    z-index: 1;
    width: 10px;
    height: 100%;
  }
  .switch-toggle label:nth-child(2):nth-last-child(4),
  .switch-toggle label:nth-child(2):nth-last-child(4) ~ label,
  .switch-toggle label:nth-child(2):nth-last-child(4) ~ a {
    width: 50%;
  }
  .switch-toggle label:nth-child(2):nth-last-child(4) ~ input:checked:nth-child(3) + label ~ a {
    left: 50%;
  }
  .switch-toggle label:nth-child(2):nth-last-child(6),
  .switch-toggle label:nth-child(2):nth-last-child(6) ~ label,
  .switch-toggle label:nth-child(2):nth-last-child(6) ~ a {
    width: 33.33%;
  }
  .switch-toggle label:nth-child(2):nth-last-child(6) ~ input:checked:nth-child(3) + label ~ a {
    left: 33.33%;
  }
  .switch-toggle label:nth-child(2):nth-last-child(6) ~ input:checked:nth-child(5) + label ~ a {
    left: 66.66%;
  }
  .switch-toggle label:nth-child(2):nth-last-child(8),
  .switch-toggle label:nth-child(2):nth-last-child(8) ~ label,
  .switch-toggle label:nth-child(2):nth-last-child(8) ~ a {
    width: 25%;
  }
  .switch-toggle label:nth-child(2):nth-last-child(8) ~ input:checked:nth-child(3) + label ~ a {
    left: 25%;
  }
  .switch-toggle label:nth-child(2):nth-last-child(8) ~ input:checked:nth-child(5) + label ~ a {
    left: 50%;
  }
  .switch-toggle label:nth-child(2):nth-last-child(8) ~ input:checked:nth-child(7) + label ~ a {
    left: 75%;
  }
  .switch-toggle label:nth-child(2):nth-last-child(10),
  .switch-toggle label:nth-child(2):nth-last-child(10) ~ label,
  .switch-toggle label:nth-child(2):nth-last-child(10) ~ a {
    width: 20%;
  }
  .switch-toggle label:nth-child(2):nth-last-child(10) ~ input:checked:nth-child(3) + label ~ a {
    left: 20%;
  }
  .switch-toggle label:nth-child(2):nth-last-child(10) ~ input:checked:nth-child(5) + label ~ a {
    left: 40%;
  }
  .switch-toggle label:nth-child(2):nth-last-child(10) ~ input:checked:nth-child(7) + label ~ a {
    left: 60%;
  }
  .switch-toggle label:nth-child(2):nth-last-child(10) ~ input:checked:nth-child(9) + label ~ a {
    left: 80%;
  }
  .switch-toggle label:nth-child(2):nth-last-child(12),
  .switch-toggle label:nth-child(2):nth-last-child(12) ~ label,
  .switch-toggle label:nth-child(2):nth-last-child(12) ~ a {
    width: 16.6%;
  }
  .switch-toggle label:nth-child(2):nth-last-child(12) ~ input:checked:nth-child(3) + label ~ a {
    left: 16.6%;
  }
  .switch-toggle label:nth-child(2):nth-last-child(12) ~ input:checked:nth-child(5) + label ~ a {
    left: 33.2%;
  }
  .switch-toggle label:nth-child(2):nth-last-child(12) ~ input:checked:nth-child(7) + label ~ a {
    left: 49.8%;
  }
  .switch-toggle label:nth-child(2):nth-last-child(12) ~ input:checked:nth-child(9) + label ~ a {
    left: 66.4%;
  }
  .switch-toggle label:nth-child(2):nth-last-child(12) ~ input:checked:nth-child(11) + label ~ a {
    left: 83%;
  }

  .switch-toggle.switch-holo,
  .switch-light.switch-holo > span {
    background-color: #464747;
    border-radius: 8px;
    box-shadow: inset rgba(0, 0, 0, 0.1) 0 1px 0;
    color: #fff;
    text-transform: uppercase;
  }
  .switch-holo label {
    color: #fff;
  }
  .switch-holo > span span {
    opacity: 0;
    transition: all 0.1s;
  }
  .switch-holo > span span:first-of-type {
    opacity: 1;
  }
  .switch-holo > span span,
  .switch-holo label {
    font-size: 85%;
    line-height: 2.15625em;
  }
  .switch-holo a {
    background-color: #83ccf0;
    border-radius: 8px;
  }

  .switch-holo.switch-light input:checked ~ span a {
    background-color: #0e88b1;
  }
  .switch-holo.switch-light input:checked ~ span span:first-of-type {
    opacity: 0;
  }
  .switch-holo.switch-light input:checked ~ span span:last-of-type {
    opacity: 1;
  }
}

@media only screen and (-webkit-max-device-pixel-ratio: 2) and (max-device-width: 80em) {
  .switch-light,
  .switch-toggle {
    -webkit-animation: webkitSiblingBugfix infinite 1s;
  }
}

@-webkit-keyframes webkitSiblingBugfix {
  from {
    -webkit-transform: translate3d(0, 0, 0);
  }
  to {
    -webkit-transform: translate3d(0, 0, 0);
  }
}
</style>
