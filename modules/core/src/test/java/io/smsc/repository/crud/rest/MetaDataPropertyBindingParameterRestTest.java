package io.smsc.repository.crud.rest;

import io.smsc.model.crud.CombineOperator;
import io.smsc.model.crud.MetaDataPropertyBindingParameter;
import io.smsc.model.crud.Operator;
import io.smsc.AbstractTest;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Arrays;
import java.util.Collections;

import static io.smsc.test_data.MetaDataPropertyBindingParameterTestData.*;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class MetaDataPropertyBindingParameterRestTest extends AbstractTest {

    @Test
    public void testGetSingleMetaDataPropertyBindingParameter() throws Exception {
        mockMvc.perform(get("/rest/repository/meta_data_property_binding_parameters/search/findOne?id=137"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.fromProperty", is(META_DATA_PROPERTY_BINDING_PARAMETER_1.getFromProperty())))
                .andExpect(jsonPath("$.toProperty", is(META_DATA_PROPERTY_BINDING_PARAMETER_1.getToProperty())))
                .andExpect(jsonPath("$.combineOperator", is(Collections.singletonList(CombineOperator.OR.toString()))))
                .andExpect(jsonPath("$.operator", is(Collections.singletonList(Operator.EQUALS.toString()))));
    }

    @Test
    public void testMetaDataPropertyBindingParameterNotFound() throws Exception {
        mockMvc.perform(post("/rest/repository/meta_data_property_binding_parameters/search/findOne?id=137")
                .content(this.json(new MetaDataPropertyBindingParameter()))
                .contentType(contentType))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllMetaDataPropertyBindingParameters() throws Exception {
        mockMvc.perform(get("/rest/repository/meta_data_property_binding_parameters/search/findAll"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.meta_data_property_binding_parameters", hasSize(1)))
                .andExpect(jsonPath("$._embedded.meta_data_property_binding_parameters[0].fromProperty", is(META_DATA_PROPERTY_BINDING_PARAMETER_1.getFromProperty())))
                .andExpect(jsonPath("$._embedded.meta_data_property_binding_parameters[0].toProperty", is(META_DATA_PROPERTY_BINDING_PARAMETER_1.getToProperty())))
                .andExpect(jsonPath("$._embedded.meta_data_property_binding_parameters[0].combineOperator", is(Collections.singletonList(CombineOperator.OR.toString()))))
                .andExpect(jsonPath("$._embedded.meta_data_property_binding_parameters[0].operator", is(Collections.singletonList(Operator.EQUALS.toString()))));
    }

    @Test
    public void testCreateMetaDataPropertyBindingParameter() throws Exception {
        String metaDataPropertyBindingParameterJson = json(new MetaDataPropertyBindingParameter(null, "from_new_property",
                "to_new_property", Collections.singletonList(CombineOperator.OR), Arrays.asList(Operator.IS,Operator.LIKE,Operator.MORE_OR_LESS)));
        this.mockMvc.perform(post("/rest/repository/meta_data_property_binding_parameters/save")
                .contentType(contentType)
                .content(metaDataPropertyBindingParameterJson))
                .andExpect(status().isCreated());
    }

    @Test
    public void testDeleteMetaDataPropertyBindingParameter() throws Exception {
        mockMvc.perform(delete("/rest/repository/meta_data_property_binding_parameters/delete?id=137"));
        mockMvc.perform(post("/rest/repository/meta_data_property_binding_parameters/search/findOne?id=137"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateMetaDataPropertyBindingParameter() throws Exception {
        MetaDataPropertyBindingParameter updated = new MetaDataPropertyBindingParameter(META_DATA_PROPERTY_BINDING_PARAMETER_1);
        updated.setFromProperty("from_updated_property");
        updated.setToProperty("to_updated_property");
        updated.setCombineOperator(Arrays.asList(CombineOperator.AND,CombineOperator.NOT));
        updated.setOperator(Arrays.asList(Operator.BETWEEN,Operator.INSTANCE_OF,Operator.LIKE, Operator.MORE_OR_LESS));
        String permissionJson = json(updated);
        mockMvc.perform(put("/rest/repository/meta_data_property_binding_parameters/save")
                .contentType(contentType)
                .content(permissionJson))
                .andExpect(status().isNoContent());
        mockMvc.perform(get("/rest/repository/meta_data_property_binding_parameters/search/findOne?id=137"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.fromProperty", is("from_updated_property")))
                .andExpect(jsonPath("$.toProperty", is("to_updated_property")))
                .andExpect(jsonPath("$.combineOperator", is(Arrays.asList(CombineOperator.AND.toString(),CombineOperator.NOT.toString()))))
                .andExpect(jsonPath("$.operator", is(Arrays.asList(Operator.BETWEEN.toString(),Operator.INSTANCE_OF.toString(),Operator.LIKE.toString(), Operator.MORE_OR_LESS.toString()))));
    }
}
