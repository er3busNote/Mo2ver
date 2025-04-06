package com.mo2ver.batch.task.listener;

import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.listener.ChunkListenerSupport;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ChunkItemListener extends ChunkListenerSupport {

    private int totalItemCount;

    @Override
    public void beforeChunk(ChunkContext context) {
        this.totalItemCount = context.getStepContext().getStepExecution().getExecutionContext().getInt("totalItemCount", 0);
    }

    @Override
    public void afterChunk(ChunkContext context) {
        int currentItemCount = context.getStepContext().getStepExecution().getReadCount();

        if (totalItemCount > 0) {
            double progress = (double) currentItemCount / totalItemCount * 100;
            log.info("Progress: " + progress + "%");
        } else {
            log.warn("총 아이템 수가 0입니다. 진행률 계산이 불가능합니다.");
        }
    }

    @Override
    public void afterChunkError(ChunkContext context) {
        log.error("Chunk 처리 중 오류 발생!");
    }
}
