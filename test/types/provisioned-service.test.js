import ProvisionedService from "../../src/types/provisioned-service";

const MOCK_PROVISIONED_SERVICE_NAME = "03ccb651-a9fe-11e8-bdf0-0a1e6a1fce0c";
const MOCK_PROVISIONED_SERVICE_URL = "https://mycluster.com/apis/servicecatalog.k8s.io/v1beta1/clusterserviceclasses/03ccb651-a9fe-11e8-bdf0-0a1e6a1fce0c"
const MOCK_PROVISIONED_SERVICE_SERVICE = "Example Service"

describe("ProvisionedService", () => {
  it("creates successfully", () => {
    const provisionedService = new ProvisionedService(MOCK_PROVISIONED_SERVICE_NAME, MOCK_PROVISIONED_SERVICE_URL, MOCK_PROVISIONED_SERVICE_SERVICE);

    expect(provisionedService.name).toBe(MOCK_PROVISIONED_SERVICE_NAME);
    expect(provisionedService.consoleURL).toBe(MOCK_PROVISIONED_SERVICE_URL);
    expect(provisionedService.service).toBe(MOCK_PROVISIONED_SERVICE_SERVICE);
  });
});
