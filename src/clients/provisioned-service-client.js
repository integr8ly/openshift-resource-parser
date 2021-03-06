import ClusterServiceClass from "../types/cluster-service-class";
import ServiceInstance from "../types/service-instance";
import ProvisionedService from "../types/provisioned-service";

/**
 * Client for retrieving and parsing Provisioned Services.
 */
export default class ProvisionedServiceClient {
  /**
   * Construct a {@link ProvisionedServiceClient}
   * @constructor
   * @param {string} openshiftURL
   */
  constructor(openshiftURL) {
    this.openshiftURL = openshiftURL;
  }

  /**
   * Retrieve a {@link ProvisionedService} from a namespace, by name.
   * @param {string} authToken The auth token for a user.
   * @param {string} namespace The namespace to find the service in.
   * @param {string} name The name of the service to retrieve.
   */
  getProvisionedService(authToken, namespace, name) {
    return this.listProvisionedServices(authToken, namespace)
      .then((provisionedServices) => {
        if (!provisionedServices || (provisionedServices.length === 0)) {
          return Promise.reject(new Error(`Provisioned service with the name ${name} not found in namespace ${namespace}`));
        }
        return provisionedServices.find(provisionedService => provisionedService.name === name);
      })
      .then((provisionedService) => {
        if (!provisionedService) {
          return Promise.reject(new Error(`Provisioned service with the name ${name} not found in namespace ${namespace}`));
        }
        return provisionedService;
      });
  }

  /**
   * Retrieve a list of {@link ProvisionedService} from a namespace.
   * @param {string} authToken
   * @param {string} namespace
   */
  listProvisionedServices(authToken, namespace) {
    return Promise.all([
      ProvisionedServiceClient.listClusterServiceClasses(this.openshiftURL, authToken),
      ProvisionedServiceClient.listServiceInstances(this.openshiftURL, authToken, namespace)])
      .then(([clusterServiceClasses, serviceInstances]) => {
        if (!serviceInstances || (serviceInstances.length === 0)) {
          return [];
        }
        return serviceInstances.map((serviceInstance) => {
          const displayName = clusterServiceClasses.find(serviceClass => serviceClass.name === serviceInstance.clusterServiceClassId);
          return new ProvisionedService(serviceInstance.name, serviceInstance.consoleURL, displayName);
        });
      });
  }

  /**
   * Retrieve a list of {@link ServiceInstance} from a namespace in OpenShift.
   * @private
   * @param {string} openshiftURL An OpenShift URL.
   * @param {string} authToken An auth token for a user.
   * @param {string} namespace The namespace to list the service instances from.
   * @returns {Promise<ServiceInstance[]>}
   */
  static listServiceInstances(openshiftURL, authToken, namespace) {
    if (!authToken) {
      return Promise.reject(new Error("Auth token should not be null"));
    }

    const headers = new Headers({
      Authorization: `Bearer ${authToken}`,
    });
    return fetch(ProvisionedServiceClient.buildServiceInstanceListRoute(openshiftURL, namespace), { headers })
      .then(response => response.json())
      .then(jsonData => jsonData.items.map(serviceInstanceJSON => ServiceInstance.fromJSON(serviceInstanceJSON)));
  }

  /**
   * Retrieve a list of {@link ClusterServiceClass} in OpenShift.
   * @private
   * @param {string} openshiftURL An OpenShift URL.
   * @param {string} authToken An auth token for a user.
   * @returns {Promise<ClusterServiceClass[]>}
   */
  static listClusterServiceClasses(openshiftURL, authToken) {
    if (!authToken) {
      return Promise.reject(new Error("Auth token should not be null"));
    }

    const headers = new Headers({
      Authorization: `Bearer ${authToken}`,
    });
    return fetch(ProvisionedServiceClient.buildClusterServiceClassListRoute(openshiftURL), { headers })
      .then(response => response.json())
      .then(jsonData => jsonData.items.filter(serviceClassJSON => ClusterServiceClass.isValidJSON(serviceClassJSON)))
      .then(jsonData => jsonData.map(serviceClassJSON => ClusterServiceClass.fromJSON(serviceClassJSON)));
  }

  /**
   * Return a valid route for retrieving service instances from OpenShift.
   * @private
   * @param {string} openshiftURL The URL of OpenShift
   * @param {string} namespace The namespace to retrieve the service instances from
   */
  static buildServiceInstanceListRoute(openshiftURL, namespace) {
    return `${openshiftURL}/apis/servicecatalog.k8s.io/v1beta1/namespaces/${namespace}/serviceinstances`;
  }

  /**
   * Build a valid route for retrieving cluster service classes from OpenShift.
   * @private
   * @param {string} openshiftURL The URL of OpenShift
   */
  static buildClusterServiceClassListRoute(openshiftURL) {
    return `${openshiftURL}/apis/servicecatalog.k8s.io/v1beta1/clusterserviceclasses`;
  }
}
