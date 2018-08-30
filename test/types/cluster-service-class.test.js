import ClusterServiceClass from "../../src/types/cluster-service-class";

const MOCK_SERVICE_CLASS_NAME = "03ccb651-a9fe-11e8-bdf0-0a1e6a1fce0c";
const MOCK_SERVICE_CLASS_DISPLAY_NAME = "MariaDB (Ephemeral)";
const MOCK_SERVICE_CLASS = {
  "metadata": {
    "name": MOCK_SERVICE_CLASS_NAME,
    "selfLink": "/apis/servicecatalog.k8s.io/v1beta1/clusterserviceclasses/03ccb651-a9fe-11e8-bdf0-0a1e6a1fce0c",
    "uid": "d6c33993-a9fe-11e8-bcf6-0a580a800004",
    "resourceVersion": "3956",
    "creationTimestamp": "2018-08-27T13:41:02Z"
  },
  "spec": {
    "externalName": "mariadb-ephemeral",
    "externalID": "03ccb651-a9fe-11e8-bdf0-0a1e6a1fce0c",
    "description": "MariaDB database service, without persistent storage. For more information about using this template, including OpenShift considerations, see https://github.com/sclorg/mariadb-container/blob/master/10.2/root/usr/share/container-scripts/mysql/README.md.\n\nWARNING: Any data stored will be lost upon pod destruction. Only use this template for testing",
    "bindable": true,
    "bindingRetrievable": false,
    "planUpdatable": false,
    "externalMetadata": {
      "console.openshift.io/iconClass":"icon-mariadb",
      "displayName":MOCK_SERVICE_CLASS_DISPLAY_NAME,
      "documentationUrl":"https://github.com/sclorg/mariadb-container/blob/master/10.2/root/usr/share/container-scripts/mysql/README.md",
      "longDescription":"This template provides a standalone MariaDB server with a database created.  The database is not stored on persistent storage, so any restart of the service will result in all data being lost.  The database name, username, and password are chosen via parameters when provisioning this service.","providerDisplayName":"Red Hat, Inc.",
      "supportUrl":"https://access.redhat.com"},
    "tags": [
      "database",
      "mariadb"
    ],
    "clusterServiceBrokerName": "template-service-broker"
  },
  "status": {
    "removedFromBrokerCatalog": false
  }
};

describe("ClusterServiceClass", () => {
  it("parses a JSON response successfully", () => {
    const clusterServiceClass = ClusterServiceClass.fromJSON(MOCK_SERVICE_CLASS);

    expect(clusterServiceClass.name).toBe(MOCK_SERVICE_CLASS_NAME);
    expect(clusterServiceClass.displayName).toBe(MOCK_SERVICE_CLASS_DISPLAY_NAME);
  });
});
