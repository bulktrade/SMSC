package io.smsc.repository.mcc;

import io.smsc.AbstractSpringMVCTest;
import io.smsc.model.mcc.Mcc;
import org.junit.Test;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Date;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.put;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WithMockUser(username = "admin", roles = {"POWER_ADMIN_USER"})
public class MccRestTest extends AbstractSpringMVCTest {

    @Test
    public void testGetSingleMcc() throws Exception {
        mockMvc.perform(get("/rest/repository/mcc/{id}", 1))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.mcc", is(0)))
                .andExpect(jsonPath("$.code", is(0)))
                .andExpect(jsonPath("$.country", is("Unknown Country")))
                .andDo(document("getMcc",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("Mobile Country Code")),
                        responseFields(mccFieldsForResponse(false))));
    }

    @Test
    public void testMccNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/mcc/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllMcc() throws Exception {
        mockMvc.perform(get("/rest/repository/mcc?page=0&size=5"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.mcc", hasSize(5)))
                .andExpect(jsonPath("$._embedded.mcc[0].mcc", is(0)))
                .andExpect(jsonPath("$._embedded.mcc[0].code", is(0)))
                .andExpect(jsonPath("$._embedded.mcc[0].country", is("Unknown Country")))
                .andDo(document("getAllMcc",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestParameters(
                                parameterWithName("page").description("Page of results"),
                                parameterWithName("size").description("Size of results")),
                        responseFields(mccFieldsForResponse(true))));
    }

    @Test
    public void testCreateMcc() throws Exception {
        Mcc mcc = new Mcc();
        mcc.setMcc(1999);
        mcc.setCode(1);
        mcc.setCountry("new country");
        String mccJson = json(mcc);

        this.mockMvc.perform(post("/rest/repository/mcc")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(mccJson))
                .andExpect(status().isCreated())
                .andDo(document("createMcc",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(mccFieldsForRequest(false)),
                        responseFields(mccFieldsForResponse(false))));
    }

    @Test
    public void testDeleteMcc() throws Exception {
        mockMvc.perform(delete("/rest/repository/mcc/{id}", 1)
                .with(csrf()))
                .andExpect(status().isNoContent())
                .andDo(document("deleteMcc",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("Mobile Country Code"))));

        mockMvc.perform(get("/rest/repository/mcc/0"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateMcc() throws Exception {
        mockMvc.perform(patch("/rest/repository/mcc/{id}", 1)
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content("{ \"country\" : \"new country\" }"))
                .andExpect(status().isOk())
                .andDo(document("updateMcc",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("Mobile Country Code")),
                        requestFields(mccFieldsForRequest(true)),
                        responseFields(mccFieldsForResponse(false))));

        mockMvc.perform(get("/rest/repository/mcc/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.country", is("new country")));
    }

    @Test
    public void testReplaceMcc() throws Exception {
        Mcc mcc = new Mcc();
        mcc.setId(1L);
        mcc.setMcc(1999);
        mcc.setCode(1999);
        mcc.setCountry("new country");
        String mccJson = json(mcc);

        mockMvc.perform(put("/rest/repository/mcc/{id}", 1)
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(mccJson))
                .andExpect(status().isOk())
                .andDo(document("replaceMcc",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("Mobile Country Code")),
                        requestFields(mccFieldsForRequest(false)),
                        responseFields(mccFieldsForResponse(false))));

        mockMvc.perform(get("/rest/repository/mcc/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.mcc", is(1999)))
                .andExpect(jsonPath("$.code", is(1999)))
                .andExpect(jsonPath("$.country", is("new country")));
    }

    /**
     * Mcc fields used in responses.
     * An array field equivalent can be provided.
     *
     * @param isJsonArray if the fields are used in a JsonArray
     * @return FieldDescriptor
     */
    private FieldDescriptor[] mccFieldsForResponse(boolean isJsonArray) {
        return isJsonArray ?
                new FieldDescriptor[]{
                        fieldWithPath("_embedded.mcc[]").description("List with Mobile Country Codes"),
                        fieldWithPath("_embedded.mcc[].id").description("Mobile Country Code's id"),
                        fieldWithPath("_embedded.mcc[].mcc").description("Mobile Country Code"),
                        fieldWithPath("_embedded.mcc[].code").description("Country code"),
                        fieldWithPath("_embedded.mcc[].country").description("Country name"),
                        fieldWithPath("_embedded.mcc[].lastModifiedDate").type(Date.class).description("Mobile Country Code's date of last modification"),
                        fieldWithPath("_embedded.mcc[].createdDate").type(Date.class).description("Mobile Country Code's creation date"),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                } :
                new FieldDescriptor[]{
                        fieldWithPath("id").description("Mobile Country Code's id"),
                        fieldWithPath("mcc").description("Mobile Country Code"),
                        fieldWithPath("code").description("Country code"),
                        fieldWithPath("country").description("Country name"),
                        fieldWithPath("lastModifiedDate").type(Date.class).description("Mobile Country Code's date of last modification"),
                        fieldWithPath("createdDate").type(Date.class).description("Mobile Country Code's creation date"),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                };
    }

    /**
     * Mcc fields used in requests.
     *
     * @return FieldDescriptor
     */
    private FieldDescriptor[] mccFieldsForRequest(boolean isPatchRequest) {
        return isPatchRequest ?
                new FieldDescriptor[]{
                        fieldWithPath("mcc").optional().type(Integer.class).description("Mobile Country Code")
                                .attributes(key("mandatory").value(false)),
                        fieldWithPath("code").optional().type(Integer.class).description("Country code")
                                .attributes(key("mandatory").value(false)),
                        fieldWithPath("country").optional().type(String.class).description("Country name")
                                .attributes(key("mandatory").value(false)),
                        fieldWithPath("id").optional().ignored(),
                        fieldWithPath("lastModifiedDate").optional().ignored(),
                        fieldWithPath("createdDate").optional().ignored(),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                } :
                new FieldDescriptor[]{
                        fieldWithPath("mcc").type(Integer.class).description("Mobile Country Code")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("code").type(Integer.class).description("Country code")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("country").type(String.class).description("Country name")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("id").optional().ignored(),
                        fieldWithPath("lastModifiedDate").optional().ignored(),
                        fieldWithPath("createdDate").optional().ignored(),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                };
    }
}
