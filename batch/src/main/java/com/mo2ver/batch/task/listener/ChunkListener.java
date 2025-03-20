package com.mo2ver.batch.task.listener;

import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.listener.ChunkListenerSupport;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ChunkListener extends ChunkListenerSupport {

    private static final Integer TOTAL_SIZE = 44446;

    @Override
    public void beforeChunk(ChunkContext context) {
        context.getStepContext().getStepExecution().getExecutionContext().putInt("totalItemCount", TOTAL_SIZE);
    }

    @Override
    public void afterChunk(ChunkContext context) {
        int currentItemCount = context.getStepContext().getStepExecution().getReadCount();
        int totalItemCount = context.getStepContext().getStepExecution().getExecutionContext().getInt("totalItemCount");

        double progress = (double) currentItemCount / totalItemCount * 100;
        log.info("Progress: " + progress + "%");
    }

    @Override
    public void afterChunkError(ChunkContext context) {
        log.error("Chunk 처리 중 오류 발생!");
    }
}
