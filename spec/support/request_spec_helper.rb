# spec/support/request_spec_helper
module RequestSpecHelper
  def json
    JSON.parse(response.body)
  end
end