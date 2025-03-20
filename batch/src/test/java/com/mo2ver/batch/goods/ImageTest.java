package com.mo2ver.batch.goods;

import com.mo2ver.batch.task.config.ImageConfig;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.test.JobLauncherTestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
@TestPropertySource(properties = {"job.name=" + ImageConfig.JOB_NAME})
public class ImageTest {

    @Autowired
    private JobLauncherTestUtils jobLauncherTestUtils;

    @Test
    @DisplayName("Image Batch 정상 동작 확인")
    public void test() throws Exception {
        JobExecution jobExecution = jobLauncherTestUtils.launchJob();
        assertThat(jobExecution.getStatus(), is(BatchStatus.COMPLETED));
    }
}
