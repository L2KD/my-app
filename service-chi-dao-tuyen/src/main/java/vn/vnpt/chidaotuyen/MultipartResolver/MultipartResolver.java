package vn.vnpt.chidaotuyen.MultipartResolver;

import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.context.ApplicationContext;

public class MultipartResolver {
    MultipartResolver multipartResolver;
    private void initMultipartResolver(ApplicationContext context)
    {
        /*try
        {
            this.multipartResolver = ((MultipartResolver)context.getBean("multipartResolver", MultipartResolver.class));
            if (this.logger.isDebugEnabled()) {
                this.logger.debug("Using MultipartResolver [" + this.multipartResolver + "]");
            }
        }
        catch (NoSuchBeanDefinitionException ex)
        {
            this.multipartResolver = null;
            if (this.logger.isDebugEnabled())
                this.logger.debug("Unable to locate MultipartResolver with name 'multipartResolver': no multipart request handling provided");
        }*/
    }
}
