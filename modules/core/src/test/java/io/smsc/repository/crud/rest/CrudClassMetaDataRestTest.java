package io.smsc.repository.crud.rest;

import io.smsc.model.crud.CrudClassMetaData;
import io.smsc.AbstractTest;
import org.junit.Test;
import org.springframework.security.test.context.support.WithMockUser;

import static io.smsc.test_data.CrudClassMetaDataTestData.*;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WithMockUser(username="Admin",roles = {"ADMIN"})
public class CrudClassMetaDataRestTest extends AbstractTest {

    @Test
    public void testGetSingleCrudClassMetaData() throws Exception {
        mockMvc.perform(get("/rest/repository/crud-class-meta-data/55"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.className", is(CRUD_CLASS_META_DATA_1.getClassName())))
                .andExpect(jsonPath("$.editable", is(CRUD_CLASS_META_DATA_1.getEditable())))
                .andExpect(jsonPath("$.query", is(CRUD_CLASS_META_DATA_1.getQuery())))
                .andExpect(jsonPath("$.titleColumns", is(CRUD_CLASS_META_DATA_1.getTitleColumns())));
    }

    @Test
    public void testCrudClassMetaDataNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/crud-class-meta-data/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllCrudClassMetaData() throws Exception {
        mockMvc.perform(get("/rest/repository/crud-class-meta-data"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.crud-class-meta-data", hasSize(9)))
                .andExpect(jsonPath("$._embedded.crud-class-meta-data[0].className", is(CRUD_CLASS_META_DATA_1.getClassName())))
                .andExpect(jsonPath("$._embedded.crud-class-meta-data[0].editable", is(CRUD_CLASS_META_DATA_1.getEditable())))
                .andExpect(jsonPath("$._embedded.crud-class-meta-data[0].query", is(CRUD_CLASS_META_DATA_1.getQuery())))
                .andExpect(jsonPath("$._embedded.crud-class-meta-data[0].titleColumns", is(CRUD_CLASS_META_DATA_1.getTitleColumns())))
                .andExpect(jsonPath("$._embedded.crud-class-meta-data[1].className", is(CRUD_CLASS_META_DATA_2.getClassName())))
                .andExpect(jsonPath("$._embedded.crud-class-meta-data[1].editable", is(CRUD_CLASS_META_DATA_2.getEditable())))
                .andExpect(jsonPath("$._embedded.crud-class-meta-data[1].query", is(CRUD_CLASS_META_DATA_2.getQuery())))
                .andExpect(jsonPath("$._embedded.crud-class-meta-data[1].titleColumns", is(CRUD_CLASS_META_DATA_2.getTitleColumns())))
                .andExpect(jsonPath("$._embedded.crud-class-meta-data[2].className", is(CRUD_CLASS_META_DATA_3.getClassName())))
                .andExpect(jsonPath("$._embedded.crud-class-meta-data[2].editable", is(CRUD_CLASS_META_DATA_3.getEditable())))
                .andExpect(jsonPath("$._embedded.crud-class-meta-data[2].query", is(CRUD_CLASS_META_DATA_3.getQuery())))
                .andExpect(jsonPath("$._embedded.crud-class-meta-data[2].titleColumns", is(CRUD_CLASS_META_DATA_3.getTitleColumns())))
                .andExpect(jsonPath("$._embedded.crud-class-meta-data[3].className", is(CRUD_CLASS_META_DATA_4.getClassName())))
                .andExpect(jsonPath("$._embedded.crud-class-meta-data[3].editable", is(CRUD_CLASS_META_DATA_4.getEditable())))
                .andExpect(jsonPath("$._embedded.crud-class-meta-data[3].query", is(CRUD_CLASS_META_DATA_4.getQuery())))
                .andExpect(jsonPath("$._embedded.crud-class-meta-data[3].titleColumns", is(CRUD_CLASS_META_DATA_4.getTitleColumns())));
    }

    @Test
    public void testCreateCrudClassMetaData() throws Exception {
        String crudClassMetaDataJson = json(new CrudClassMetaData(null,"CrudMetaDefaultData", "columnHeight", true, "new_query"));
        this.mockMvc.perform(post("/rest/repository/crud-class-meta-data")
                .contentType("application/json;charset=UTF-8")
                .content(crudClassMetaDataJson))
                .andExpect(status().isCreated());
    }

    @Test
    public void testDeleteCrudClassMetaData() throws Exception {
        mockMvc.perform(delete("/rest/repository/crud-class-meta-data/55"));
        mockMvc.perform(get("/rest/repository/crud-class-meta-data/55"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateCrudClassMetaData() throws Exception {
        CrudClassMetaData updated = new CrudClassMetaData(CRUD_CLASS_META_DATA_1);
        updated.setClassName("newClassName");
        updated.setEditable(false);
        updated.setQuery("newQuery");
        String permissionJson = json(updated);
        mockMvc.perform(put("/rest/repository/crud-class-meta-data/55")
                .contentType("application/json;charset=UTF-8")
                .content(permissionJson))
                .andExpect(status().isOk());
        mockMvc.perform(get("/rest/repository/crud-class-meta-data/55"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.className", is(updated.getClassName())))
                .andExpect(jsonPath("$.editable", is(updated.getEditable())))
                .andExpect(jsonPath("$.query", is(updated.getQuery())))
                .andExpect(jsonPath("$.titleColumns", is(updated.getTitleColumns())));
    }
}
