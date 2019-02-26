import $ from 'jquery';
window.$ = $;
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap/dist/css/bootstrap.css';
import Swal from 'sweetalert2';
// $('#exampleModal').modal('toggle');

// import * as Compute from '@google-cloud/compute';
const Compute = __non_webpack_require__('@google-cloud/compute');
const compute = new Compute({
  projectId: 'jew-vpn'
});
const zone = compute.zone('asia-southeast1-c');
const vm = zone.vm('vpn');

$('#stop').click(function() {
  vm
    .stop()
    .then(function(data) {
      console.log(data);
      return vm.waitFor('TERMINATED');
    })
    .then(data => {
      Swal.fire('vpn is terminated.');
      console.log('vpn is terminated.');
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
});

$('#start').click(function() {
  vm
    .start()
    .then(function(data) {
      console.log(data);
      return vm.waitFor('RUNNING');
    })
    .then(data => {
      Swal.fire('vpn is started.');
      console.log('vpn is started.');
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
});

