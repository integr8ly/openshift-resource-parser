import ProvisionedServiceClient from "./clients/provisioned-service-client";
import MockProvisionedServiceClient from "./clients/mock-provisioned-service-client";

/**
 * Provides a set of functions for retrieving various OpenShift resources and
 * parsing them into a specific format.
 */
export default class OpenShiftResourceParser {
  /**
   * Construct a new {@link OpenShiftResourceParser}
   * @param {Object} config Configuration for the parser.
   * @param {string} config.openshiftURL The URL of OpenShift.
   * @param {boolean} config.mockData Whether the parser should use mock data or not.
   */
  constructor(config) {
    this.config = config;
    this.provisionedServiceClient = new ProvisionedServiceClient(this.config.openshiftURL);
  }

  /**
   * Get a ProvisionedService from a specified namespace, by name.
   * @param {string} authToken An auth token for a user.
   * @param {string} namespace The namespace to find the service in.
   * @param {string} serviceName The name of the service to retrieve.
   * @returns {Promise<ProvisionedService>}
   */
  getProvisionedMWService(authToken, namespace, serviceName) {
    if (this.config.mockData) {
      return MockProvisionedServiceClient.getProvisionedService();
    }
    return this.provisionedServiceClient.getProvisionedService(authToken, namespace, serviceName);
  }

  /**
   * Retrieve a list of provisioned services in a namespace.
   * @param {string} authToken
   * @param {string} namespace
   * @returns {Promise<ProvisionedService>}
   */
  listProvisionedMWServices(authToken, namespace) {
    if (this.config.mockData) {
      return MockProvisionedServiceClient.listProvisionedServices();
    }
    return this.provisionedServiceClient.listProvisionedServices(authToken, namespace);
  }
}
