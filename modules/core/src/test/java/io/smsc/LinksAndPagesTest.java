package io.smsc;

import org.junit.Test;
import org.springframework.restdocs.hypermedia.LinksSnippet;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.security.test.context.support.WithMockUser;

import static org.springframework.restdocs.hypermedia.HypermediaDocumentation.halLinks;
import static org.springframework.restdocs.hypermedia.HypermediaDocumentation.linkWithRel;
import static org.springframework.restdocs.hypermedia.HypermediaDocumentation.links;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WithMockUser(username = "admin", roles = {"POWER_ADMIN_USER"})
public class LinksAndPagesTest extends AbstractSpringMVCTest {

    @Test
    public void testGenerateLinksSnippet() throws Exception {
        mockMvc.perform(get("/rest/repository/authorities"))
                .andExpect(status().isOk())
                .andDo(document("getLinks",
                        linkLinks));
    }

    @Test
    public void testGeneratePagesSnippet() throws Exception {
        mockMvc.perform(get("/rest/repository/authorities"))
                .andExpect(status().isOk())
                .andDo(document("getPages",
                        responseFields(pageSnippet())));
    }

    private LinksSnippet linkLinks = links(
            halLinks(),
            linkWithRel("_links").optional().description("List with links on resources"),
            linkWithRel("first").optional().description("The first page of results"),
            linkWithRel("last").optional().description("The last page of results"),
            linkWithRel("next").optional().description("The next page of results"),
            linkWithRel("prev").optional().description("The previous page of results"),
            linkWithRel("self").optional().description("The page of current result"),
            linkWithRel("search").optional().description("The page for searching results"),
            linkWithRel("profile").optional().description("The page with common information about current resource"),
            linkWithRel("createdBy").optional().description("The page with user who created current resource"),
            linkWithRel("lastModifiedBy").optional().description("The page with user who updated current resource last time"),
            linkWithRel("{name_of_resource}").optional().description("The page with resource which is related to current"));

    private FieldDescriptor[] pageSnippet() {
        return new FieldDescriptor[]{
                fieldWithPath("page.size").optional().type(Number.class).description("Number of pages with resources"),
                fieldWithPath("page.totalElements").optional().type(Number.class).description("Total number of current resources"),
                fieldWithPath("page.totalPages").optional().type(Number.class).description("Total number for pages with current resource"),
                fieldWithPath("page.number").optional().type(Number.class).description("Number of current page"),
                fieldWithPath("_embedded").optional().ignored(),
                fieldWithPath("_links").optional().ignored()
        };
    }
}
