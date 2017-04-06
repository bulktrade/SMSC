package io.smsc.repository.mcc;

import io.smsc.AbstractSpringMVCTest;
import io.smsc.model.mcc.Mcc;
import io.smsc.model.mcc.Mnc;
import org.junit.Test;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.security.test.context.support.WithMockUser;

import java.util.Date;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WithMockUser(username = "admin", roles = {"POWER_ADMIN_USER"})
public class MncRestTest extends AbstractSpringMVCTest {

    @Test
    public void testGetSingleMnc() throws Exception {
        mockMvc.perform(get("/rest/repository/mnc/{id}", 1))
                .andExpect(status().isOk())
                .andDo(print())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.mnc", is("88")))
                .andExpect(jsonPath("$.carrier", is("A-Mobile")))
                .andDo(document("getMnc",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("Mobile Network Code")),
                        responseFields(mncFieldsForResponse(false))));
    }

    @Test
    public void testMncNotFound() throws Exception {
        mockMvc.perform(get("/rest/repository/mnc/9999"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetAllMnc() throws Exception {
        mockMvc.perform(get("/rest/repository/mnc?page=0&size=5"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$._embedded.mnc", hasSize(5)))
                .andExpect(jsonPath("$._embedded.mnc[0].mnc", is("88")))
                .andExpect(jsonPath("$._embedded.mnc[0].carrier", is("A-Mobile")))
                .andDo(document("getAllMnc",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestParameters(
                                parameterWithName("page").description("Page of results"),
                                parameterWithName("size").description("Size of results")),
                        responseFields(mncFieldsForResponse(true))));
    }

    @Test
    public void testCreateMnc() throws Exception {
        Mnc mnc = new Mnc();
        mnc.setId(null);
        mnc.setMnc("1000");
        mnc.setCarrier("Carrier");
        String mncJson = json(mnc);
        mncJson = mncJson.substring(0, mncJson.length() - 1).concat(", \"mcc\" : \"/rest/repository/mcc/1\" \r\n }");

        this.mockMvc.perform(post("/rest/repository/mnc")
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content(mncJson))
                .andExpect(status().isCreated())
                .andDo(document("createMnc",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(mncFieldsForRequest(false)),
                        responseFields(mncFieldsForResponse(false))));
    }

    @Test
    public void testDeleteMnc() throws Exception {
        mockMvc.perform(delete("/rest/repository/mnc/{id}", 1)
                .with(csrf()))
                .andExpect(status().isNoContent())
                .andDo(document("deleteMnc",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("Mobile Network Code"))));

        mockMvc.perform(get("/rest/repository/mnc/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testUpdateMnc() throws Exception {
        mockMvc.perform(patch("/rest/repository/mnc/{id}", 1)
                .with(csrf())
                .contentType("application/json;charset=UTF-8")
                .content("{ \"carrier\" : \"new carrier\" }"))
                .andExpect(status().isOk())
                .andDo(document("updateMnc",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(getPathParam("Mobile Network Code")),
                        requestFields(mncFieldsForRequest(true)),
                        responseFields(mncFieldsForResponse(false))));

        mockMvc.perform(get("/rest/repository/mnc/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$.carrier", is("new carrier")));
    }

//    @Test
//    public void testReplaceMnc() throws Exception {
//        Mnc mnc = new Mnc();
//        mnc.setId(1L);
//        mnc.setMnc("1000");
//        mnc.setCarrier("Carrier");
//        String mncJson = json(mnc);
//        mncJson = mncJson.substring(0, mncJson.length() - 1).concat(", \"mcc\" : \"/rest/repository/mcc/5\" \r\n }");
//
//        mockMvc.perform(put("/rest/repository/mcc/{id}", 1)
//                .with(csrf())
//                .contentType("application/json;charset=UTF-8")
//                .content(mncJson))
//                .andExpect(status().isOk())
//                .andDo(document("replaceMnc",
//                        preprocessRequest(prettyPrint()),
//                        preprocessResponse(prettyPrint()),
//                        pathParameters(getPathParam("Mobile Network Code")),
//                        requestFields(mncFieldsForRequest(false)),
//                        responseFields(mncFieldsForResponse(false))));
//
//        mockMvc.perform(get("/rest/repository/mnc/1"))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(contentType))
//                .andExpect(jsonPath("$.mnc", is("1000")))
//                .andExpect(jsonPath("$.carrier", is("Carrier")));
//
//        mockMvc.perform(get("/rest/repository/mnc/1/mcc"))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(contentType))
//                .andExpect(jsonPath("$.mcc", is(0)))
//                .andExpect(jsonPath("$.code", is(0)))
//                .andExpect(jsonPath("$.country", is("Unknown Country")));
//    }

    /**
     * Mnc fields used in responses.
     * An array field equivalent can be provided.
     *
     * @param isJsonArray if the fields are used in a JsonArray
     * @return FieldDescriptor
     */
    private FieldDescriptor[] mncFieldsForResponse(boolean isJsonArray) {
        return isJsonArray ?
                new FieldDescriptor[]{
                        fieldWithPath("_embedded.mnc[]").description("List with Mobile Network Codes"),
                        fieldWithPath("_embedded.mnc[].id").description("Mobile Network Code's id"),
                        fieldWithPath("_embedded.mnc[].mnc").description("Mobile Network Code"),
                        fieldWithPath("_embedded.mnc[].carrier").description("Carrier name"),
                        fieldWithPath("_embedded.mnc[].lastModifiedDate").type(Date.class).description("Mobile Network Code's date of last modification"),
                        fieldWithPath("_embedded.mnc[].createdDate").type(Date.class).description("Mobile Network Code's creation date"),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                } :
                new FieldDescriptor[]{
                        fieldWithPath("id").description("Mobile Network Code's id"),
                        fieldWithPath("mnc").description("Mobile Network Code"),
                        fieldWithPath("carrier").description("Carrier name"),
                        fieldWithPath("lastModifiedDate").type(Date.class).description("Mobile Network Code's date of last modification"),
                        fieldWithPath("createdDate").type(Date.class).description("Mobile Network Code's creation date"),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                };
    }

    /**
     * Mnc fields used in requests.
     *
     * @return FieldDescriptor
     */
    private FieldDescriptor[] mncFieldsForRequest(boolean isPatchRequest) {
        return isPatchRequest ?
                new FieldDescriptor[]{
                        fieldWithPath("mnc").optional().type(String.class).description("Mobile Network Code")
                                .attributes(key("mandatory").value(false)),
                        fieldWithPath("carrier").optional().type(String.class).description("Carrier name")
                                .attributes(key("mandatory").value(false)),
                        fieldWithPath("mcc").optional().type(Mcc.class).description("Mobile Country Code")
                                .attributes(key("mandatory").value(false)),
                        fieldWithPath("id").optional().ignored(),
                        fieldWithPath("lastModifiedDate").optional().ignored(),
                        fieldWithPath("createdDate").optional().ignored(),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                } :
                new FieldDescriptor[]{
                        fieldWithPath("mnc").optional().type(String.class).description("Mobile Network Code")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("carrier").optional().type(String.class).description("Carrier name")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("mcc").optional().type(Mcc.class).description("Mobile Country Code")
                                .attributes(key("mandatory").value(true)),
                        fieldWithPath("id").optional().ignored(),
                        fieldWithPath("lastModifiedDate").optional().ignored(),
                        fieldWithPath("createdDate").optional().ignored(),
                        fieldWithPath("_links").optional().ignored(),
                        fieldWithPath("page").optional().ignored()
                };
    }
}
