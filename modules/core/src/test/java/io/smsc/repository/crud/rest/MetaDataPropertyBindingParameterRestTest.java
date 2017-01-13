package io.smsc.repository.crud.rest;

import io.smsc.model.crud.CombineOperator;
import io.smsc.model.crud.MetaDataPropertyBindingParameter;
import io.smsc.model.crud.Operator;
import io.smsc.AbstractTest;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;

import static io.smsc.test_data.MetaDataPropertyBindingParameterTestData.*;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class MetaDataPropertyBindingParameterRestTest extends AbstractTest {

    @Test
    public void testGetSingleMetaDataPropertyBindingParameter() throws Exception {
        mockMvc.perform(get("/rest/repository/meta-data-property-binding-parameters/137"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.fromProperty", is(META_DATA_PROPERTY_BINDING_PARAMETER_1.getFromProperty())))
                .andExpect(jsonPath("$.toProperty", is(META_DATA_PROPERTY_BINDING_PARAMETER_1.getToProperty())))
                .andExpect(jsonPath("$.combineOperator", is(CombineOperator.OR.toString())))
                .andExpect(jsonPath("$.operator", is(Operator.EQUALS.toString())));
    }

    @Test
    public void testMetaDataPropertyBindingParameterNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/meta-data-property-binding-parameters/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllMetaDataPropertyBindingParameters() throws Exception {
        mockMvc.perform(get("/rest/repository/meta-data-property-binding-parameters"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.meta-data-property-binding-parameters", hasSize(1)))
                .andExpect(jsonPath("$._embedded.meta-data-property-binding-parameters[0].fromProperty", is(META_DATA_PROPERTY_BINDING_PARAMETER_1.getFromProperty())))
                .andExpect(jsonPath("$._embedded.meta-data-property-binding-parameters[0].toProperty", is(META_DATA_PROPERTY_BINDING_PARAMETER_1.getToProperty())))
                .andExpect(jsonPath("$._embedded.meta-data-property-binding-parameters[0].combineOperator", is(CombineOperator.OR.toString())))
                .andExpect(jsonPath("$._embedded.meta-data-property-binding-parameters[0].operator", is(Operator.EQUALS.toString())));
    }

    @Test
    public void testCreateMetaDataPropertyBindingParameter() throws Exception {
        String metaDataPropertyBindingParameterJson = json(new MetaDataPropertyBindingParameter(null, "from_new_property",
                "to_new_property", CombineOperator.OR, Operator.IS));
        this.mockMvc.perform(post("/rest/repository/meta-data-property-binding-parameters")
                .contentType(contentType)
                .content(metaDataPropertyBindingParameterJson))
                .andExpect(status().isCreated());
    }

    @Test
    public void testDeleteMetaDataPropertyBindingParameter() throws Exception {
        mockMvc.perform(delete("/rest/repository/meta-data-property-binding-parameters/137"));
        mockMvc.perform(get("/rest/repository/meta-data-property-binding-parameters/137"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateMetaDataPropertyBindingParameter() throws Exception {
        MetaDataPropertyBindingParameter updated = new MetaDataPropertyBindingParameter(META_DATA_PROPERTY_BINDING_PARAMETER_1);
        updated.setFromProperty("from_updated_property");
        updated.setToProperty("to_updated_property");
        updated.setCombineOperator(CombineOperator.AND);
        updated.setOperator(Operator.MORE_OR_LESS);
        String permissionJson = json(updated);
        mockMvc.perform(put("/rest/repository/meta-data-property-binding-parameters/137")
                .contentType(contentType)
                .content(permissionJson))
                .andExpect(status().isNoContent());
        mockMvc.perform(get("/rest/repository/meta-data-property-binding-parameters/137"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.fromProperty", is("from_updated_property")))
                .andExpect(jsonPath("$.toProperty", is("to_updated_property")))
                .andExpect(jsonPath("$.combineOperator", is(CombineOperator.AND.toString())))
                .andExpect(jsonPath("$.operator", is(Operator.MORE_OR_LESS.toString())));
    }
}
