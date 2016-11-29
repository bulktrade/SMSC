package io.smsc.repository.crud.rest;

import io.smsc.model.crud.CrudMetaGridData;
import io.smsc.model.crud.MetaDataPropertyBindingParameter;
import io.smsc.repository.AbstractRepositoryTest;
import org.junit.Test;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import static io.smsc.test_data.CrudMetaGridDataTestData.*;
import static io.smsc.test_data.MetaDataPropertyBindingParameterTestData.*;
import static io.smsc.test_data.CrudClassMetaDataTestData.*;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class CrudMetaGridDataRestRepositoryTest extends AbstractRepositoryTest {

    @Test
    public void testGetSingleCrudMetaGridData() throws Exception {
        mockMvc.perform(get("/rest/repository/crud-meta-grid-data/15"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.property", is(CRUD_META_GRID_DATA_1.getProperty())))
                .andExpect(jsonPath("$.editable", is(CRUD_META_GRID_DATA_1.getEditable())))
                .andExpect(jsonPath("$.visible", is(CRUD_META_GRID_DATA_1.getVisible())))
                .andExpect(jsonPath("$.decorator", is(CRUD_META_GRID_DATA_1.getDecorator())))
                .andExpect(jsonPath("$.order", is(CRUD_META_GRID_DATA_1.getOrder())))
                .andExpect(jsonPath("$.columnWidth", is(CRUD_META_GRID_DATA_1.getColumnWidth())));
    }

    @Test
    public void testCrudMetaGridDataNotFound() throws Exception {
        mockMvc.perform(post("/rest/repository/crud-meta-grid-data/99")
                .content(this.json(new CrudMetaGridData()))
                .contentType(contentType))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllCrudMetaGridDatas() throws Exception {
        mockMvc.perform(get("/rest/repository/crud-meta-grid-data"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.crud-meta-grid-data", hasSize(20)))
                .andExpect(jsonPath("$._embedded.crud-meta-grid-data[0].property", is(CRUD_META_GRID_DATA_1.getProperty())))
                .andExpect(jsonPath("$._embedded.crud-meta-grid-data[0].editable", is(CRUD_META_GRID_DATA_1.getEditable())))
                .andExpect(jsonPath("$._embedded.crud-meta-grid-data[0].visible", is(CRUD_META_GRID_DATA_1.getVisible())))
                .andExpect(jsonPath("$._embedded.crud-meta-grid-data[0].decorator", is(CRUD_META_GRID_DATA_1.getDecorator())))
                .andExpect(jsonPath("$._embedded.crud-meta-grid-data[0].order", is(CRUD_META_GRID_DATA_1.getOrder())))
                .andExpect(jsonPath("$._embedded.crud-meta-grid-data[0].columnWidth", is(CRUD_META_GRID_DATA_1.getColumnWidth())))
                .andExpect(jsonPath("$._embedded.crud-meta-grid-data[1].property", is(CRUD_META_GRID_DATA_2.getProperty())))
                .andExpect(jsonPath("$._embedded.crud-meta-grid-data[1].editable", is(CRUD_META_GRID_DATA_2.getEditable())))
                .andExpect(jsonPath("$._embedded.crud-meta-grid-data[1].visible", is(CRUD_META_GRID_DATA_2.getVisible())))
                .andExpect(jsonPath("$._embedded.crud-meta-grid-data[1].decorator", is(CRUD_META_GRID_DATA_2.getDecorator())))
                .andExpect(jsonPath("$._embedded.crud-meta-grid-data[1].order", is(CRUD_META_GRID_DATA_2.getOrder())))
                .andExpect(jsonPath("$._embedded.crud-meta-grid-data[1].columnWidth", is(CRUD_META_GRID_DATA_2.getColumnWidth())))
                .andExpect(jsonPath("$._embedded.crud-meta-grid-data[18].property", is(CRUD_META_GRID_DATA_19.getProperty())))
                .andExpect(jsonPath("$._embedded.crud-meta-grid-data[18].editable", is(CRUD_META_GRID_DATA_19.getEditable())))
                .andExpect(jsonPath("$._embedded.crud-meta-grid-data[18].visible", is(CRUD_META_GRID_DATA_19.getVisible())))
                .andExpect(jsonPath("$._embedded.crud-meta-grid-data[18].decorator", is(CRUD_META_GRID_DATA_19.getDecorator())))
                .andExpect(jsonPath("$._embedded.crud-meta-grid-data[18].order", is(CRUD_META_GRID_DATA_19.getOrder())))
                .andExpect(jsonPath("$._embedded.crud-meta-grid-data[18].columnWidth", is(CRUD_META_GRID_DATA_19.getColumnWidth())))
                .andExpect(jsonPath("$._embedded.crud-meta-grid-data[19].property", is(CRUD_META_GRID_DATA_20.getProperty())))
                .andExpect(jsonPath("$._embedded.crud-meta-grid-data[19].editable", is(CRUD_META_GRID_DATA_20.getEditable())))
                .andExpect(jsonPath("$._embedded.crud-meta-grid-data[19].visible", is(CRUD_META_GRID_DATA_20.getVisible())))
                .andExpect(jsonPath("$._embedded.crud-meta-grid-data[19].decorator", is(CRUD_META_GRID_DATA_20.getDecorator())))
                .andExpect(jsonPath("$._embedded.crud-meta-grid-data[19].order", is(CRUD_META_GRID_DATA_20.getOrder())))
                .andExpect(jsonPath("$._embedded.crud-meta-grid-data[19].columnWidth", is(CRUD_META_GRID_DATA_20.getColumnWidth())));
    }

    @Test
    public void testCreateCrudMetaGridData() throws Exception {
        CrudMetaGridData newCrudMetaGridData = new CrudMetaGridData(null,"defaultProperty", true,
                true, null, 10.0, 50.0);
        String crudMetaGridDataJson = json(newCrudMetaGridData);
        this.mockMvc.perform(post("/rest/repository/crud-meta-grid-data")
                .contentType(contentType)
                .content(crudMetaGridDataJson))
                .andExpect(status().isCreated());
    }

    @Test
    public void testDeleteCrudMetaGridData() throws Exception {
        mockMvc.perform(delete("/rest/repository/crud-meta-grid-data/15"));
        mockMvc.perform(post("/rest/repository/crud-meta-grid-data/15"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateCrudMetaGridData() throws Exception {
        CrudMetaGridData updated = new CrudMetaGridData(CRUD_META_GRID_DATA_1);
        updated.setDecorator("newDecorator");
        updated.setEditable(false);
        updated.setOrder(20.0);
        updated.setProperty("newProperty");
        updated.setVisible(false);
        updated.setColumnWidth(30.0);
        String permissionJson = json(updated);
        mockMvc.perform(put("/rest/repository/crud-meta-grid-data/15")
                .contentType(contentType)
                .content(permissionJson))
                .andExpect(status().isNoContent());
        mockMvc.perform(get("/rest/repository/crud-meta-grid-data/15"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.property", is("newProperty")))
                .andExpect(jsonPath("$.editable", is(false)))
                .andExpect(jsonPath("$.visible", is(false)))
                .andExpect(jsonPath("$.decorator", is("newDecorator")))
                .andExpect(jsonPath("$.order", is(20.0)))
                .andExpect(jsonPath("$.columnWidth", is(30.0)));
    }
}
