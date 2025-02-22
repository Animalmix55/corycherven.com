import { registerApplication, start } from 'single-spa';
import {
    constructApplications,
    constructRoutes,
    constructLayoutEngine
} from 'single-spa-layout';

const layoutElement = document.querySelector('#single-spa-layout');
if (!layoutElement) throw new Error('Layout element not found');

const routes = constructRoutes(layoutElement);
const applications = constructApplications({
    routes,
    loadApp({ name }) {
        return System.import(name);
    }
});

const layoutEngine = constructLayoutEngine({ routes, applications });
applications.forEach(registerApplication);

layoutEngine.activate();
start();
